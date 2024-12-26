import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Chatbot = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || "User";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [language, setLanguage] = useState("en");
  const [labels, setLabels] = useState({
    logout: "Logout",
    greeting: `Hello, ${userName}!`,
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem("country");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    let initialMessage = "";
    let logoutLabel = "";
    let greetingLabel = "";

    if (savedLanguage === "en") {
      initialMessage = "WELCOME TO PATBOT! ASK FOR ME";
      logoutLabel = "Logout";
      greetingLabel = `Hello, ${userName}!`;
    } else if (savedLanguage === "kr") {
      initialMessage = "PATBOT에 오신 것을 환영합니다! 질문하세요.";
      logoutLabel = "로그아웃";
      greetingLabel = `안녕하세요, ${userName}!`;
    } else if (savedLanguage === "vn") {
      initialMessage = "CHÀO MỪNG ĐẾN VỚI PATBOT! HỎI TÔI ĐI.";
      logoutLabel = "Đăng xuất";
      greetingLabel = `Xin chào, ${userName}!`;
    } else {
      initialMessage = "WELCOME TO PATBOT! ASK FOR ME";
      logoutLabel = "Logout";
      greetingLabel = `Hello, ${userName}!`;
    }

    setMessages([{ sender: "bot", text: initialMessage }]);
    setLabels({ logout: logoutLabel, greeting: greetingLabel });
  }, [userName]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // 사용자 메시지 추가
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Flask 서버 호출
    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      // Flask에서 받은 응답 추가
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, there was an error!" }]);
    }

    setInput(""); // 입력 필드 초기화
  };

  const handleLogout = () => {
    navigate("/");
  };

  const styles = {
    container: {
      fontFamily: '"Arial", sans-serif',
      backgroundColor: isDarkTheme ? "#121212" : "#ffffff",
      color: isDarkTheme ? "#ffffff" : "#000000",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row",
    },
    sidebar: {
      width: "250px",
      height: "100vh",
      backgroundColor: isDarkTheme ? "#333333" : "#f1f1f1", // Đổi nền theo theme
      color: isDarkTheme ? "#ffffff" : "#000000", // Đổi chữ theo theme
      boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
      padding: "20px",
      position: "fixed",
      left: isSidebarOpen ? "0" : "-290px",
      top: "0",
      transition: "left 0.3s ease",
      zIndex: 10,
    },
    sidebarContent: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    chatArea: {
      flex: 1,
      marginLeft: isSidebarOpen ? "290px" : "0",
      transition: "margin-left 0.3s ease",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      borderBottom: `1px solid ${isDarkTheme ? "#ffffff" : "#000000"}`,
    },
    logoutButton: {
      marginRight: "10px",
      padding: "5px 10px",
      backgroundColor: "#ff5252",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    greeting: {
      fontWeight: "bold",
    },
    chatWindow: {
      flex: 1,
      padding: "20px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
    },
    message: {
      maxWidth: "60%",
      padding: "10px 15px",
      borderRadius: "10px",
      marginBottom: "10px",
      lineHeight: "1.5",
      display: "inline-block",
    },
    botMessage: {
      backgroundColor: "#cceeff",
      color: "#000000",
      alignSelf: "flex-start",
    },
    userMessage: {
      backgroundColor: "#cccccc",
      color: "#000000",
      alignSelf: "flex-end",
    },
    inputSection: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      borderTop: `none`,
      backgroundColor: "#e0f7fa",
      borderRadius: "10px",
      margin: "10px 20px",
      width: "820px",
    },
    input: {
      flex: 1,
      padding: "5px",
      border: "none",
      borderRadius: "10px",
      outline: "none",
      backgroundColor: "#e0f7fa",
      fontSize: "16px",
      width: "100%",
    },
    toggleButton: {
      position: "absolute",
      left: isSidebarOpen ? "250px" : "0",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "#007bff",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px 0 0 5px",
      padding: "10px",
      cursor: "pointer",
      zIndex: 20,
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarContent}>Sidebar</h3>
        <p>Here can show patent information</p>
      </div>

      {/* Chat Area */}
      <div style={styles.chatArea}>
        <button onClick={toggleSidebar} style={styles.toggleButton}>
          {isSidebarOpen ? "<" : ">"}
        </button>

        <div style={styles.header}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            {labels.logout}
          </button>
          <span style={styles.greeting}>{labels.greeting}</span>
          <button onClick={toggleTheme}>{isDarkTheme ? "☀️" : "🌙"}</button>
        </div>

        <div style={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(msg.sender === "bot" ? styles.botMessage : styles.userMessage),
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <form style={styles.inputSection} onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.sendButton}>
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
