import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Starting = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
        navigate("/chat", { state: { userName: id } }); // 로그인 성공 시 채팅 화면으로 이동
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
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
      fontFamily: '"Arial", sans-serif',
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    form: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      width: "100%",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      margin: "10px 0",
    },
    link: {
      display: "block",
      marginTop: "10px",
      textAlign: "center",
      color: "#007bff",
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
