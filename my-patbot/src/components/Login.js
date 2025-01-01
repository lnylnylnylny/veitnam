import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { useDarkMode } from "./DarkModeContext"; // 다크모드 Context 추가
import iconVN from "../icon/vietnam.png";
import iconKR from "../icon/south-korea.png";
import iconUS from "../icon/usa.png";
import Heading from "./Heading";

const Login = () => {
  const { isDarkTheme } = useDarkMode(); // 다크모드 상태 가져오기
  const { language, changeLanguage } = useLanguage(); // 언어 Context 사용
  const navigate = useNavigate();

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    localStorage.setItem("country", lang); // 언어 설정 로컬 저장
  };

  const handleJoin = async (e) => {
    e.preventDefault();

    const userData = {
      id: document.getElementById("id").value.trim(),
      password: document.getElementById("password").value.trim(),
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      nationality: localStorage.getItem("country") || "en",
    };

    if (!userData.id || !userData.password || !userData.name || !userData.email) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Registration successful!");
        navigate("/starting"); // 로그인 페이지로 이동
      } else {
        alert(result.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
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
    formWrapper: {
      maxWidth: "600px", // 폼 너비 조정
      width: "100%",
      backgroundColor: isDarkTheme ? "#333" : "#fff",
      borderRadius: "10px",
      boxShadow: isDarkTheme
        ? "0 4px 6px rgba(0, 0, 0, 0.5)"
        : "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "20px 30px",
      textAlign: "center",
      marginTop: "40px", // Heading과의 간격 추가
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "5px",
      textAlign: "left", // 좌측 정렬
    },
    input: {
      display: "block",
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: isDarkTheme ? "1px solid #444" : "1px solid #ddd",
      backgroundColor: isDarkTheme ? "#555" : "#ffffff",
      color: isDarkTheme ? "#ffffff" : "#000000",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
    },
    flagWrapper: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "10px",
    },
    flag: {
      cursor: "pointer",
      width: "40px",
      height: "30px",
    },
    nationalityLabel: {
      fontWeight: "bold",
      marginBottom: "10px",
    },
    title: {
      textAlign: "center",
      marginBottom: "0px",
      fontSize: "20px",
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
      <Heading />
      <div style={styles.formWrapper}>
        <form onSubmit={handleJoin}>
          <p style={styles.title}>{texts[language].title}</p>



          <div style={styles.formGroup}>
            <p style={styles.nationalityLabel}>{texts[language].nationality}</p>
            <div style={styles.flagWrapper}>
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

          <button type="submit" style={styles.button}>
            {texts[language].join}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
