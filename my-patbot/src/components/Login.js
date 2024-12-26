import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import iconVN from "../icon/vietnam.png";
import iconKR from "../icon/south-korea.png";
import iconUS from "../icon/usa.png";

const Login = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { language, changeLanguage } = useLanguage(); // Context for language
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    localStorage.setItem("country", lang); // Save selected language to localStorage
  };

  const handleJoin = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value; // Lấy giá trị của trường tên
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }
    localStorage.setItem("userName", name); // Save username to localStorage
    navigate("/chat", { state: { userName: name } }); // Navigate to Chat interface
  };

  const styles = {
    container: {
      fontFamily: '"Arial", sans-serif',
      backgroundColor: isDarkTheme ? "#121212" : "#ffffff",
      color: isDarkTheme ? "#ffffff" : "#000000",
      minHeight: "100vh",
      padding: "20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    form: {
      backgroundColor: isDarkTheme ? "rgba(110, 119, 119, 0.8)" : "rgba(36, 236, 225, 0.8)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "5px",
    },
    input: {
      display: "block",
      backgroundColor: isDarkTheme ? "rgba(151, 161, 160, 0.8)" : "#ffffff",
      width: "90%",
      margin: "10px 0",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ddd",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
    flag: {
      cursor: "pointer",
      margin: "5px",
      width: "40px",
      height: "30px",
      border: "1px solid #ddd",
    },
    nationalityLabel: {
      fontWeight: "bold",
      marginBottom: "10px",
    },
  };

  const texts = {
    en: {
      title: "Please write in the order below",
      id: "ID",
      password: "Password",
      name: "Name",
      email: "Email",
      nationality: "Nationality",
      join: "JOIN",
    },
    kr: {
      title: "아래 순서대로 작성하세요",
      id: "아이디",
      password: "비밀번호",
      name: "이름",
      email: "이메일",
      nationality: "국적",
      join: "가입",
    },
    vn: {
      title: "Vui lòng viết theo thứ tự dưới đây",
      id: "ID",
      password: "Mật khẩu",
      name: "Tên",
      email: "Email",
      nationality: "Quốc tịch",
      join: "Tham gia",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1>PATBOT</h1>
        <div>
          <button onClick={toggleTheme} style={{ cursor: "pointer" }}>
            {isDarkTheme ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Form */}
      <form style={styles.form} onSubmit={handleJoin}>
        <p>{texts[language].title}</p>

        <div style={styles.formGroup}>
          <label htmlFor="id" style={styles.label}>
            {texts[language].id}
          </label>
          <input id="id" type="text" required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            {texts[language].password}
          </label>
          <input id="password" type="password" required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            {texts[language].name}
          </label>
          <input id="name" type="text" required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            {texts[language].email}
          </label>
          <input id="email" type="email" required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <p style={styles.nationalityLabel}>{texts[language].nationality}</p>
          <div>
            <img
              src={iconKR}
              alt="Korea"
              style={styles.flag}
              onClick={() => handleLanguageChange("kr")}
            />
            <img
              src={iconVN}
              alt="Vietnam"
              style={styles.flag}
              onClick={() => handleLanguageChange("vn")}
            />
            <img
              src={iconUS}
              alt="USA"
              style={styles.flag}
              onClick={() => handleLanguageChange("en")}
            />
          </div>
        </div>

        <button type="submit" style={styles.button}>
          {texts[language].join}
        </button>
      </form>
    </div>
  );
};

export default Login;
