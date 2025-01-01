import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from './DarkModeContext';

const Heading = () => {
  const { isDarkTheme, toggleTheme } = useDarkMode();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleStartingClick = () => {
    navigate('/starting');
  };

  const styles = {
    header: {
      display: 'flex',
      alignItems: 'center',
      width: '97%',
      padding: '10px 20px',
      backgroundColor: isDarkTheme ? '#1e1e1e' : '#fff',
      borderBottom: isDarkTheme ? '1px solid #444' : '1px solid #ddd',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    themeToggleWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '60px',
      height: '30px',
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
      top: '5px',
      left: isDarkTheme ? '35px' : '5px',
      transition: 'all 0.3s ease',
    },
    logoWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: isDarkTheme ? '#f9f9f9' : '#333',
      cursor: 'pointer',
    },
    loginWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginLeft: 'auto',
    },
    login: {
      fontSize: '18px',
      color: isDarkTheme ? '#ffffff' : '#000000',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.header}>
      <div style={styles.themeToggleWrapper} onClick={toggleTheme}>
        <div style={styles.themeToggle}></div>
      </div>
      <div style={styles.logoWrapper}>
        <div style={styles.logo} onClick={handleLogoClick}>
          PATBOT
        </div>
      </div>
      <div style={styles.loginWrapper}>
        <div style={styles.login} onClick={handleLoginClick}>
          JOIN
        </div>
        <p>|</p>
        <div style={styles.login} onClick={handleStartingClick}>
          LOGIN
        </div>
      </div>
    </div>
  );
};

export default Heading;
