import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext";
import sidebarIcon from "../icon/sidebar.png";
import sendIcon from "../icon/send.png";
import newchat from "../icon/refresh.png";


const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkTheme, toggleTheme } = useDarkMode();
  const userName = location.state?.userName || "User";

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
      initialMessage = "PATBOT에 오신 것을 환영합니다! 특허에 관련하여 질문해주세요.";
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

    setCurrentChat([{ sender: "bot", text: initialMessage }]);
    setLabels({ logout: logoutLabel, greeting: greetingLabel });
  }, [userName]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

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

    setInput("");
  };

  const saveCurrentChat = () => {
    if (currentChat.length > 0) {
      setChatHistory((prev) => [...prev, { id: Date.now(), messages: currentChat }]);
      setCurrentChat([]);
    }
  };

  const handleLogout = () => {
    navigate("/");
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
      maxWidth: "90%",
      margin: "0 auto",
    },
    message: {
      maxWidth: "70%",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3>채팅 기록</h3>
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setCurrentChat(chat.messages)}
            style={styles.message}
          >
            {new Date(chat.id).toLocaleString()}
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
