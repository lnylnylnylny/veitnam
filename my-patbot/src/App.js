import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageContext';
import { DarkModeProvider } from './components/DarkModeContext';
import Welcome from './components/Welcome';
import Login from './components/Login';
import ChatBot from './components/ChatBot';
import Starting from './components/Starting';
import Specification from './components/Specification/Specification';

const App = () => {
  return (
    <LanguageProvider>
      <DarkModeProvider> {/* DarkModeProvider로 감싸기 */}
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/starting" element={<Starting />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/specification" element={<Specification />} />
          </Routes>
        </Router>
      </DarkModeProvider>
    </LanguageProvider>
  );
};

export default App;
