import React, { useState, useEffect, useRef } from "react";
import robot from "../../icon/robot.png";
import userIcon from "../../icon/user (1).png";
import loadingIcon from "../../icon/Loading.gif";

const LeftAI = ({ onSaveResponse }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [inventionName, setInventionName] = useState(""); // 발명의 명칭 저장
    const [aiResponse, setAIResponse] = useState(""); // 현재 AI 응답 저장
    const bottomRef = useRef(null);
  
    const steps = [
      "발명이 속한 기술 분야를 설명해주세요.",
      "기존 기술의 문제점과 발명의 필요성을 설명해주세요.",
      "발명이 해결하고자 하는 문제를 정의해주세요.",
      "문제를 해결하기 위한 발명의 구체적 방법과 구성을 설명해주세요.",
      "발명을 통해 얻을 수 있는 장점을 기술해주세요.",
      "발명을 실제로 구현하는 방법을 구체적으로 서술해주세요.",
      "특허로 보호받고자 하는 발명의 범위를 정의해주세요.",
      "발명의 핵심을 짧게 정리해주세요.",
    ];
  
    useEffect(() => {
      if (currentStep === 0 && chatHistory.length === 0) {
        setChatHistory([{ sender: "bot", text: "발명의 명칭을 입력해주세요." }]);
      }
    }, [currentStep, chatHistory.length]);
  
    useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);
  
    const formatAIResponse = (response) => {
        // 줄바꿈 처리 및 리스트 형식으로 포맷
        const formatted = response
          .replace(/(?:\d+\.\s)/g, '<li>') // 숫자로 시작하는 항목을 리스트로 변환
          .replace(/(?:\*\*)/g, '') // 불필요한 '**' 제거
          .replace(/(?:\n)/g, '<br />'); // 줄바꿈 문자를 <br />로 변환
        return `<ul>${formatted}</ul>`; // 리스트를 감싸는 태그 추가
      };

    const fetchAIResponse = async (currentQuestion, context) => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `${currentQuestion} (발명의 명칭: ${context["발명의_명칭"]})`,
            context,
          }),
        });
  
        const data = await response.json();
        // 마크다운 형식을 텍스트로 변환
        return formatAIResponse(data.response);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        return "AI와의 연결에 문제가 발생했습니다.";
      }
    };
  
    const handleApproveResponse = () => {
      onSaveResponse({ question: steps[currentStep - 1], answer: aiResponse });
      setCurrentStep((prev) => prev + 1);
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: steps[currentStep] || "모든 질문이 완료되었습니다!" },
      ]);
      setAIResponse(""); // 응답 초기화
    };
  
    const handleRejectResponse = async () => {
      setLoading(true);
      const context = { 발명의_명칭: inventionName };
      const newResponse = await fetchAIResponse(steps[currentStep - 1], context);
      setAIResponse(newResponse);
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: `다시 작성된 ${steps[currentStep - 1]}: "${newResponse}"` },
      ]);
      setLoading(false);
    };
  
    const handleUserInput = async (e) => {
      e.preventDefault();
      if (!input.trim()) return;
  
      const userMessage = { sender: "user", text: input };
      setChatHistory((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);
  
      if (currentStep === 0) {
        setInventionName(input);
        onSaveResponse({ question: "발명의 명칭", answer: input });
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", text: steps[currentStep] },
        ]);
        setCurrentStep((prev) => prev + 1);
      } else {
        const context = { 발명의_명칭: inventionName };
        const response = await fetchAIResponse(steps[currentStep - 1], context);
        setAIResponse(response);
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", text: `AI가 작성한 ${steps[currentStep - 1]}: "${response}"` },
        ]);
      }
  
      setLoading(false);
    };
  
    const styles = {
      container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      },
      chatWindow: {
        flex: 1,
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        overflowY: "auto",
      },
      buttonGroup: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
      },
      button: {
        padding: "10px 20px",
        backgroundColor: "#cceeff", // 챗봇 대화창과 같은 색상
        color: "#333333", // 버튼 텍스트 색상 (명확한 대비를 위해 어두운 색)
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      },
      buttonHover: {
        backgroundColor: "#99d6ff", // 버튼 hover 시 약간 더 어두운 색상
      },
      inputSection: {
        display: "flex",
        marginTop: "10px",
        padding: "10px", // 입력 섹션 전체에 여백 추가
        gap: "10px", // 입력창과 버튼 사이 간격 추가
        backgroundColor: "#f9f9f9", // 입력창 배경 강조 (선택 사항)
        borderRadius: "10px", // 입력 섹션 모서리 둥글게
      },
      input: {
        flex: 1,
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #ccc",
      },
      sendButton: {
        padding: "12px 20px", // 버튼 내부 여백 조정
        backgroundColor: "#cceeff", // 챗봇 창과 동일한 색상
        color: "#333333",
        border: "none",
        borderRadius: "10px", // 버튼 모서리 둥글게
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      },
      loadingIcon: {
        display: "flex",
        justifyContent: "center",
        margin: "10px 0",
      },
    };
  
    return (
      <div style={styles.container}>
        <div style={styles.chatWindow}>
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                marginBottom: "10px",
              }}
            >
              <img
                src={msg.sender === "bot" ? robot : userIcon}
                alt="avatar"
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <div
                style={{
                  backgroundColor: msg.sender === "bot" ? "#cceeff" : "#e0e0e0",
                  padding: "10px",
                  borderRadius: "10px",
                  maxWidth: "70%",
                }}

                dangerouslySetInnerHTML={{
                    __html: msg.text, // AI의 포맷팅된 HTML을 렌더링
                  }}
              >

              </div>
            </div>
          ))}
        {loading && (
          <div style={styles.loadingIcon}>
            <img src={loadingIcon} alt="Loading..." width="40" />
          </div>
        )}

          <div ref={bottomRef}></div>
        </div>
  
        {!loading && aiResponse && (
          <div style={styles.buttonGroup}>
            <button style={styles.button} 
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={handleRejectResponse}>
              다시 작성
            </button>
            <button style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
             onClick={handleApproveResponse}>
              다음 질문으로 넘어가기
            </button>
          </div>
        )}
  
        <form style={styles.inputSection} onSubmit={handleUserInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="답변을 입력하세요..."
            style={styles.input}
          />
          <button type="submit" style={styles.sendButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}>
            전송
          </button>
        </form>
      </div>
    );
  };
  
  export default LeftAI;
  
