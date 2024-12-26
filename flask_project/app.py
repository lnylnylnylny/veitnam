from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_model import get_ai_response

# Flask 초기화
app = Flask(__name__)
CORS(app)  # React와 CORS 문제 방지

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    React에서 보낸 메시지를 처리하고 AI 응답을 반환하는 API.
    """
    user_message = request.json.get('message')

    # 메시지가 없는 경우
    if not user_message:
        return jsonify({"response": "No message received!"})

    try:
        # AI 응답 생성
        ai_response = get_ai_response(user_message)
        
        # JSON 직렬화 가능 여부 확인
        if not isinstance(ai_response, str):
            ai_response = str(ai_response)
        
        return jsonify({"response": ai_response})
    except Exception as e:
        return jsonify({"response": f"Error generating response: {str(e)}"})

@app.route('/')
def home():
    """
    기본 경로에 접속할 경우 안내 메시지를 반환.
    """
    return "Flask server is running. Use the /api/chat endpoint for communication."

if __name__ == '__main__':
    app.run(debug=True)
