import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import Window from './Window';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(true); // 로그인 팝업 상태

  return (
    <Router>
      <Routes>
        <Route
          path="/omniverse"
          element={
            <PrivateRoute>
              <Window />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* 로그인 팝업 */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Router>
  );
}

export default App;
