import React from "react";

const RightUser = ({ responses }) => {
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      height: "100%",
      overflowY: "auto", // 스크롤 가능
    },
    header: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333333",
        textAlign: "center",
        marginBottom: "15px",
      },
    responseItem: {
        marginBottom: "15px",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        lineHeight: "1.6",
      },
    question: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#007bff",
        marginBottom: "8px",
      },
    answer: {
      fontSize: "14px",
      lineHeight: "1.6", // 줄 간격 조정
      textAlign: "left", // 텍스트 정렬
      whiteSpace: "pre-line", // 줄바꿈 반영
      color: "#555", // 답변 텍스트 색상
    },
    button: {
        display: "block",
        margin: "20px auto",
        padding: "12px 20px",
        backgroundColor: "#cceeff",
        color: "black",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s ease",
      },
      buttonHover: {
        backgroundColor: "#99d6ff", // 버튼 hover 시 약간 더 어두운 색상
      },
  };

    // 작성된 명세서를 클립보드에 복사하는 함수
    const handleCopyToClipboard = () => {
        const content = responses
          .map((response) => `${response.question}\n${response.answer}\n`)
          .join("\n");
        navigator.clipboard.writeText(content).then(() => {
          alert("작성된 명세서가 클립보드에 복사되었습니다!");
        });
      };

  return (
    <div style={styles.container}>
      <h3 style={{ marginBottom: "20px", textAlign: "center" }}>작성된 명세서</h3>
      {responses.map((response, index) => (
        <div key={index} style={styles.responseItem}>
          <div style={styles.question}>{response.question}</div>
          <div
            style={styles.answer}
            dangerouslySetInnerHTML={{ __html: response.answer }}
          ></div>
        </div>
      ))}
      {/* 복사 버튼 추가 */}
      <button style={styles.button} 
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}onClick={handleCopyToClipboard}>
        작성된 명세서 복사하기
      </button>
    </div>
  );
};

export default RightUser;
