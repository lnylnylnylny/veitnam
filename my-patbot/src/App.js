import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageContext';
import Welcome from './components/Welcome';
import Login from './components/Login';
import ChatBot from './components/ChatBot';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatBot />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
