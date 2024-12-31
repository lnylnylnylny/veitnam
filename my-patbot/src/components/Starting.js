import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext"; // 다크모드 Context 추가
import Heading from "./Heading";

const Starting = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { isDarkTheme } = useDarkMode(); // 다크모드 상태 가져오기

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!id.trim() || !password.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();
      if (data.success) {
        navigate("/chat", { state: { userName: id } });
      } else {
        setErrorMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
      console.error("Login error:", error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/login"); // 회원가입 화면으로 이동
  };

  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontFamily: '"Arial", sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      position: 'relative',
      backgroundColor: isDarkTheme ? '#121212' : '#f9f9f9',
      color: isDarkTheme ? '#f9f9f9' : '#333',
    },
    form: {
      backgroundColor: isDarkTheme ? "#333333" : "#ffffff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: isDarkTheme
        ? "0 4px 8px rgba(0, 0, 0, 0.5)"
        : "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "500px",
      width: "100%",
      boxSizing: "border-box",
      textAlign: "center",
      marginTop: "60px",
    },
    input: {
      width: "calc(100% - 20px)",
      padding: "10px",
      margin: "10px 0",
      border: isDarkTheme ? "1px solid #444" : "1px solid #ccc",
      borderRadius: "5px",
      boxSizing: "border-box",
      backgroundColor: isDarkTheme ? "#555" : "#ffffff",
      color: isDarkTheme ? "#ffffff" : "#000000",
    },
    button: {
      width: "95%",
      padding: "10px",
      backgroundColor: isDarkTheme ? "#007bff" : "#C8F6F8",
      color: isDarkTheme ? "#ffffff" : "black",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      margin: "20px 0",
    },
    link: {
      display: "block",
      marginTop: "10px",
      textAlign: "center",
      color: isDarkTheme ? "#66bfff" : "#007bff",
      cursor: "pointer",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <Heading />
      <form style={styles.form} onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit" style={styles.button}>
          Login
        </button>
        <p style={styles.link} onClick={handleRegisterRedirect}>
          Not a member? Register here
        </p>
      </form>
    </div>
  );
};

export default Starting;
