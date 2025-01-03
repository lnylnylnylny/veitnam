import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Left_AI from "./LeftAI";
import Right_User from "./RightUser";

const Specification = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]); // 사용자 입력 저장
  
  // 사용자가 입력한 답변 저장
  const handleSaveResponse = (response) => {
    setResponses((prev) => [...prev, response]);
  };

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#f1f1f1",
      borderBottom: "2px solid #ccc",
      height: "60px", // 고정 높이 설정
    },
    headerTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        flex: 1,
      },
      button: {
        cursor: "pointer",
        padding: "8px 16px",
        backgroundColor: "#cceeff", // 통일된 색상
        color: "#333", // 텍스트 색상
        border: "none", // 테두리 제거
        borderRadius: "10px", // 둥근 모서리
        fontSize: "14px",
        transition: "background-color 0.3s ease, transform 0.2s ease", // 부드러운 전환 효과
      },
      buttonHover: {
        backgroundColor: "#99d6ff", // Hover 색상
      },
    container: {
      display: "flex",
      flexDirection: "row",
      height: "90vh", // 헤더 제외한 전체 높이
      overflow: "hidden", // 스크롤 방지
    },
    leftPanel: {
      flex: 1,
      borderRight: "1px solid #ccc",
      overflow: "auto", // 스크롤 가능
    },
    rightPanel: {
      flex: 1,
      overflow: "auto", // 스크롤 가능
    },
  };

  return (
    <div>
      {/* 헤더 */}
      <div style={styles.header}>
        <button style={styles.button} 
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={() => navigate("/chat")}>
          이전 채팅으로 돌아가기
        </button>
        <div style={styles.headerTitle}>PATBOT</div>
        <button style={styles.button} 
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={() => navigate("/")}>
          로그아웃
        </button>
      </div>

      {/* 본문 */}
      <div style={styles.container}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <Left_AI 
          onSaveResponse={handleSaveResponse} 
          responses={responses} />
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <Right_User responses={responses} />
        </div>
      </div>
    </div>
  );
};

export default Specification;
