import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from './DarkModeContext'; // DarkModeContext 사용
import img from "../icon/robot_1.png";
import Heading from "./Heading";

const Welcome = () => {
  const { isDarkTheme, toggleTheme } = useDarkMode(); // 다크모드 상태 및 토글 함수 가져오기
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/starting');
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
    contentWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      maxWidth: '800px',
      padding: '20px',
      boxSizing: 'border-box',
    },
    messageBox: {
      position: 'relative',
      width: '100%',
      top: '30px',
      maxWidth: '700px',
      padding: '40px',
      backgroundColor: isDarkTheme ? '#333' : '#C8F6F8',
      borderRadius: '15px',
      fontSize: '16px',
      color: isDarkTheme ? '#f9f9f9' : '#333',
      textAlign: 'left',
      boxSizing: 'border-box',
    },
    messageBoxBefore: {
      content: '""',
      position: 'absolute',
      bottom: '-15px',
      left: '30px',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '20px 20px 0 20px',
      borderColor: isDarkTheme
        ? '#333 transparent transparent transparent'
        : '#C8F6F8 transparent transparent transparent',
    },
    robotImage: {
      position: 'absolute',
      top: 'calc(100% + 35px)',
      left: '0px',
      width: '160px',
      height: 'auto',
    },
    loginText: {
      color: '#ff5252',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <Heading />
      <div style={styles.contentWrapper}>
        <div style={styles.messageBox}>
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
        <img src={img} alt="Robot" style={styles.robotImage} />
      </div>
    </div>
  );
};

export default Welcome;
