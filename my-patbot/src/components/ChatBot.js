import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext";
import sidebarIcon from "../icon/sidebar.png";
import sendIcon from "../icon/send.png";
import newchat from "../icon/refresh.png";
import robot from "../icon/robot.png";
import user from "../icon/user (1).png";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkTheme, toggleTheme } = useDarkMode();
  const userName = location.state?.userName || "User";
  const [selectedChatId, setSelectedChatId] = useState(null);

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
  
    if (savedLanguage === "kr") {
      initialMessage = "PATBOT에 오신 것을 환영합니다! 특허에 관련하여 질문해주세요.";
      logoutLabel = "로그아웃";
      greetingLabel = `안녕하세요, ${userName}!`;
    } else {
      initialMessage = "WELCOME TO PATBOT! ASK FOR ME";
      logoutLabel = "Logout";
      greetingLabel = `Hello, ${userName}!`;
    }
  
    setCurrentChat([{ sender: "bot", text: initialMessage }]);
    setLabels({ logout: logoutLabel, greeting: greetingLabel });
  
    // 새로고침 이후 사이드바 상태를 조정
    if (chatHistory.length > 0) {
      setIsSidebarOpen(true); // 새로고침 후 사이드바를 강제로 열기
    }
  }, [userName, chatHistory]); // `chatHistory`를 의존성 배열에 추가
  

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput(""); // 입력 필드 초기화
    
    setCurrentChat((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setCurrentChat((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setCurrentChat((prev) => [...prev, { sender: "bot", text: "Sorry, there was an error!" }]);
    } 
      

  };

  const saveCurrentChat = () => {
    if (currentChat.length > 0) {
      setChatHistory((prev) => [...prev, { id: Date.now(), messages: currentChat }]);
      setCurrentChat([]); // 새 채팅 초기화
      setInput(""); // 입력창 초기화
    }
  };
  
  const handleLogout = () => {
    navigate("/");
  };

  const deleteChatHistory = (id) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== id));
  };
  

  const styles = {
    container: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      fontFamily: '"Arial", sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      position: "relative",
      backgroundColor: isDarkTheme ? "#121212" : "#f9f9f9",
      color: isDarkTheme ? "#f9f9f9" : "#333",
    },
    sidebar: {
      width: "250px",
      height: "100vh",
      backgroundColor: isDarkTheme ? "#333333" : "#f1f1f1",
      color: isDarkTheme ? "#ffffff" : "#000000",
      boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
      padding: "20px",
      position: "fixed",
      left: isSidebarOpen ? "0" : "-290px",
      top: "0",
      transition: "left 0.3s ease",
      zIndex: 10,
    },
    chatArea: {
      flex: 1,
      marginLeft: isSidebarOpen ? "290px" : "0",
      transition: "margin-left 0.3s ease",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden", // 오버플로우 방지
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      borderBottom: `1px solid ${isDarkTheme ? "#ffffff" : "#000000"}`,
    },
    buttonGroup: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    toggleButton: {
      padding: "5px 10px",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
    },
    icon: {
      width: "24px",
      height: "24px",
    },

    switch: {
      position: "relative",
      display: "inline-block",
      width: "34px",
      height: "20px",
    },
    switchInput: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    slider: {
      position: "absolute",
      cursor: "pointer",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#ccc",
      transition: "0.4s",
      borderRadius: "34px",
    },
    sliderBefore: {
      position: "absolute",
      content: '""',
      height: "14px",
      width: "14px",
      left: "3px",
      bottom: "3px",
      backgroundColor: "white",
      transition: "0.4s",
      borderRadius: "50%",
    },
    sliderChecked: {
      backgroundColor: "#2196f3",
    },
    sliderBeforeChecked: {
      transform: "translateX(14px)",
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

    sendIcon: {
      width: "24px",
      height: "24px",
    },
    chatWindow: {
      flex: 1,
      padding: "20px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      //반응형일 때 width: "100%", maxWidth: "900px",
      width: "900px", // 화면 사이즈 맞춤 설정
      margin: "0 auto",
      borderRadius: "10px",
    },
    messageContainer: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      marginBottom: "10px",
    },
    messageContainerUser: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      marginBottom: "10px",
      flexDirection: "row-reverse", // 사용자 메시지 아이콘을 오른쪽으로 정렬
    },
    message: {
      maxWidth: "70%",
      padding: "10px 15px",
      borderRadius: "10px",
      lineHeight: "1.5",
    },
    botMessage: {
      backgroundColor: "#cceeff",
      color: "#000000",
    },
    userMessage: {
      backgroundColor: "#cccccc",
      color: "#000000",
    },
    messageImage: {
      width: "30px",
      height: "30px",
    },
    inputSection: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      backgroundColor: "#e0f7fa",
      borderRadius: "10px",
      margin: "10px 20px",
    },
    input: {
      flex: 1,
      padding: "5px",
      border: "none",
      borderRadius: "10px",
      outline: "none",
      backgroundColor: "#e0f7fa",
      fontSize: "16px",
    },
    saveChatButton: {
      padding: "5px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
    },
    selectedChat: {
      backgroundColor: isDarkTheme ? "#555555" : "#e0f7fa", // 강조 색상
      color: isDarkTheme ? "#ffffff" : "#000000", 
      borderRadius: "5px",
      padding: "10px",
    },
    chatItem: {
      padding: "10px",
      cursor: "pointer",
      marginBottom: "10px",
      borderRadius: "5px",
    },
    deleteButton: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: isDarkTheme ? "#ffffff" : "#000000",
      fontSize: "16px",
      marginLeft: "10px",
    },
    chatHistoryItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px",
      borderRadius: "5px",
      marginBottom: "5px",
      cursor: "pointer",
      backgroundColor: "transparent",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
  <h3>채팅 기록</h3>
  {chatHistory.map((chat) => (
    <div
      key={chat.id}
      onClick={() => {
        setSelectedChatId(chat.id); // 선택된 채팅 ID 설정
        setCurrentChat(chat.messages); // 채팅 내용을 로드
      }}
      style={{
        ...styles.chatHistoryItem,
        ...(selectedChatId === chat.id ? styles.selectedChat : {}),
      }}
    >
      <span style={{ flex: 1 }}>
        {new Date(chat.id).toLocaleString()}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // 클릭 이벤트 전파 방지
          deleteChatHistory(chat.id); // 해당 채팅 삭제
        }}
        style={styles.deleteButton}
      >
        X
      </button>
    </div>
  ))}
</div>

      <div style={styles.chatArea}>
        <div style={styles.header}>
          <div style={styles.buttonGroup}>
            <button onClick={toggleSidebar} style={styles.toggleButton}>
              <img src={sidebarIcon} alt="Toggle Sidebar" style={styles.icon} />
            </button>
            <label style={styles.switch}>
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={isDarkTheme}
                style={styles.switchInput}
              />
               <span
                style={{
                  ...styles.slider,
                  ...(isDarkTheme ? styles.sliderChecked : {}),
                }}
              >
                <span
                  style={{
                    ...styles.sliderBefore,
                    ...(isDarkTheme ? styles.sliderBeforeChecked : {}),
                  }}
                ></span>
              </span>
            </label>
          </div>
          <span>{labels.greeting}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            {labels.logout}
          </button>
        </div>

        <div style={styles.chatWindow}>
  {currentChat.map((msg, index) => (
    <div
      key={index}
      style={
        msg.sender === "bot" ? styles.messageContainer : styles.messageContainerUser
      }
    >
      {/* AI와 사용자 아이콘 */}
      <img
        src={msg.sender === "bot" ? robot : user}
        alt={msg.sender === "bot" ? "Robot" : "User"}
        style={styles.messageImage}
      />

      {/* 메시지 내용 */}
      <div
        style={{
          ...styles.message,
          ...(msg.sender === "bot" ? styles.botMessage : styles.userMessage),
        }}
      >
        <span>{msg.text}</span>
      </div>
    </div>
  ))}
</div>


        <form style={styles.inputSection} onSubmit={handleSendMessage}>
          <button type="button" onClick={saveCurrentChat} style={styles.saveChatButton}>
            <img src={newchat} alt="Save Chat" style={styles.sendIcon} />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.saveChatButton}>
            <img src={sendIcon} alt="Send" style={styles.sendIcon} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
