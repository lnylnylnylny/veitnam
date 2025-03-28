from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder, FewShotChatMessagePromptTemplate
from langchain.chains import create_history_aware_retriever
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.memory.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from config import answer_examples
import time


store = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

def get_retriever():
    embedding = OpenAIEmbeddings(model='text-embedding-3-large')
    index_name = 'patent-index'
    database = PineconeVectorStore.from_existing_index(index_name=index_name, embedding=embedding)
    retriever = database.as_retriever(search_kwargs={'k': 3})
    return retriever

def get_history_retriever():
    llm = get_llm()
    retriever = get_retriever()

    contextualize_q_system_prompt = (
        "Given a chat history and the latest user question "
        "which might reference context in the chat history, "
        "formulate a standalone question which can be understood "
        "without the chat history. Do NOT answer the question, "
        "just reformulate it if needed and otherwise return it as is."
    )

    contextualize_q_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", contextualize_q_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )

    history_aware_retriever = create_history_aware_retriever(
        llm, retriever, contextualize_q_prompt
    )
    return history_aware_retriever

def get_llm(model='gpt-4o'):
    llm = ChatOpenAI(model=model)
    return llm

def get_dictionary_chain():
    dictionary = ["특허 = 특허"]
    llm = get_llm()
    prompt = ChatPromptTemplate.from_template(f"""
        사용자의 질문을 보고, 우리의 사전을 참고해서 사용자의 질문을 변경해주세요.
        만약 변경할 필요가 없다고 판단된다면, 사용자의 질문을 변경하지 않아도 됩니다.
        그런 경우에는 질문만 리턴해주세요
        사전: {dictionary}
        
        질문: {{question}}
    """
    )

    dictionary_chain = prompt | llm | StrOutputParser()

    return dictionary_chain

def get_rag_chain():
    llm = get_llm()
    example_prompt = ChatPromptTemplate.from_messages(
        [
            ("human", "{input}"),
            ("ai", "{answer}"),
        ]
    )
    few_shot_prompt = FewShotChatMessagePromptTemplate(
        example_prompt=example_prompt,
        examples=answer_examples,
    )
    
    system_prompt = (
        "당신은 특허법 전문가입니다. 사용자의 특허법에 관한 질문에 답변해주세요."
        "아래에 제공된 문서를 활용해서 답변해주시고, "
        "답변을 알 수 없다면 사과와 함께 모른다고 답변해주세요."
        "\n\n"
        "{context}"
    )

    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            few_shot_prompt,  # Few-Shot Prompt 추가
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    
    history_aware_retriever = get_history_retriever() # None으로 하면
    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    conversational_rag_chain = RunnableWithMessageHistory(
        rag_chain,
        get_session_history,
        input_messages_key="input",
        history_messages_key="chat_history",
        output_messages_key="answer",
    ).pick('answer')

    return conversational_rag_chain


def get_ai_response(user_message, context=None):
    try:
        # 1. 예제 질문 확인
        example_match = next(
            (example["answer"] for example in answer_examples if example["input"] == user_message),
            None
        )
        
        # 2. 예제 질문과 일치하면 해당 답변 반환
        if example_match:
            time.sleep(3)
            return example_match

        # 3. 예제 질문과 일치하지 않으면 RAG 체인 실행
        dictionary_chain = get_dictionary_chain()
        rag_chain = get_rag_chain()

        # 문맥이 있다면 이를 함께 전달
        input_data = {"question": user_message}
        if context:
            input_data["context"] = context

        patent_chain = {"input": dictionary_chain} | rag_chain
        
        # 응답 생성
        response_generator = patent_chain.stream(
            input_data,
            config={"configurable": {"session_id": "abc123"}},
        )
        response = ''.join([chunk for chunk in response_generator])
        
        # 결과 확인 및 반환
        if not response or "알 수 없다" in response:
            return "죄송합니다. 해당 질문에 대한 답변을 찾을 수 없습니다."
        
        return response
    except Exception as e:
        return f"Error in AI response generation: {str(e)}"

