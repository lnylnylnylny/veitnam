import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageContext';
import Welcome from './components/Welcome';
import Login from './components/Login';
import ChatBot from './components/ChatBot';
import Starting from './components/Starting';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/starting" element={<Starting />} />
          <Route path="/chat" element={<ChatBot />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
