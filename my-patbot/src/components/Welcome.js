import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../icon/robot_1.png";

const Welcome = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const handleLoginClick = () => {
    navigate('/login'); 
  };
  
  const handleStartingClick = () => {
    navigate('/starting'); 
  };

  const styles = {
    container: {
      
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: '"Arial", sans-serif',
      backgroundColor: isDarkTheme ? '#121212' : '#f9f9f9',
      color: isDarkTheme ? '#f9f9f9' : '#333',
      
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '97%',
      padding: '10px 20px',
      backgroundColor: isDarkTheme ? '#1e1e1e' : '#fff',
      borderBottom: isDarkTheme ? '1px solid #444' : '1px solid #ddd',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: isDarkTheme ? '#f9f9f9' : '#333',
    },
    themeToggleWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '25px',
      backgroundColor: isDarkTheme ? '#333' : '#ddd',
      borderRadius: '25px',
      position: 'relative',
      cursor: 'pointer',
    },
    themeToggle: {
      position: 'absolute',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: isDarkTheme ? '#f9f9f9' : '#333',
      top: '2.5px',
      left: isDarkTheme ? '25px' : '2.5px',
      transition: 'all 0.3s ease',
    },
    themeIcon: {
      position: 'absolute',
      fontSize: '12px',
      color: isDarkTheme ? '#f9f9f9' : '#333',
    },
    sunIcon: {
      left: '5px',
    },
    moonIcon: {
      right: '5px',
    },
    login: {
      fontSize: '18px',
      color: '#000000',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    content: {
      textAlign: 'center',
      marginTop: '20px',
    },
    messageBox: {
      marginTop: '20px',
      position: 'relative', // Định vị để sử dụng pseudo-elements
      display: 'inline-block',
      padding: '20px',
      backgroundColor: isDarkTheme ? '#424242' : 'rgba(57, 169, 233, 0.8)',
      borderRadius: '15px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
      fontSize: '16px',
      color: isDarkTheme ? '#f9f9f9' : '#333',
      textAlign: 'left',
    },
    messageBoxAfter: {
      content: '""',
      position: 'absolute',
      bottom: '-15px', // Đặt đầu nhọn phía dưới
      left: '20px', // Điều chỉnh vị trí ngang
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '15px 15px 0 15px', // Tạo tam giác lớn hơn
      borderColor: `${isDarkTheme ? '#333' : '#b2ebf2'} transparent transparent transparent`, // Viền lớn làm shadow
      zIndex: -1, // Đẩy pseudo-element này xuống dưới
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)', // Shadow của viền
    },
    messageBoxBefore: {
      content: '""',
      position: 'absolute',
      bottom: '-10px', // Đặt đầu nhọn phía dưới, nằm lên trên viền shadow
      left: '20px', // Điều chỉnh vị trí ngang
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '10px 10px 0 10px', // Tạo tam giác nhỏ hơn (chính tam giác đầu nhọn)
      borderColor: `${isDarkTheme ? '#424242' : 'rgba(57, 169, 233, 0.8)'} transparent transparent transparent`, // Màu tam giác chính
      zIndex: 0,
    },
    robotImage: {
      marginTop: '30px', // Khoảng cách giữa tam giác và icon
      width: '100px',
      height: 'auto',
      display: 'block',
      position: 'fixed',
      left: '300px', // Căn giữa icon robot
    },
    loginText: {
      color: '#ff5252',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
      <div style={styles.themeToggleWrapper} onClick={toggleTheme}>
          <div style={styles.themeToggle}></div>
          <span style={{ ...styles.themeIcon, ...styles.sunIcon }}>☀️</span>
          <span style={{ ...styles.themeIcon, ...styles.moonIcon }}>🌙</span>
        </div>
        <div style={styles.logo}>PATBOT</div>
        <div style={styles.login} onClick={handleLoginClick}>
          JOIN
        </div>
        <div style={styles.login} onClick={handleStartingClick}>
          LOGIN
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.messageBox}>
          <div style={styles.messageBoxAfter}></div>
          <div style={styles.messageBoxBefore}></div>
          <p>Welcome to PATBOT!</p>
          <p>
            It is a chatbot that informs you of similar patents when you search
            for patents.
          </p>
          <p>
            Please{' '}
            <span style={styles.loginText} onClick={handleLoginClick}>
              LOGIN
            </span>{' '}
            first
          </p>
        </div>
        <img
          src= {img}
          alt="Robot"
          style={styles.robotImage}
        />
      </div>
    </div>
  );
};

export default Welcome;
