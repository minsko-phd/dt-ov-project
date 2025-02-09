import React, { useState } from 'react';
import Modal from '../common/Modal'; // Modal 컴포넌트 import
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/lg_elec_logo.png'; // 로고 이미지 import

const Login = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('minsuk.ko@lge.com'); // 초기 아이디 설정
  const [password, setPassword] = useState('1234'); // 초기 비밀번호 설정
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 사용자 정보 저장 (하이라이트 부분)
    const users = [
      { username: 'minsuk.ko@lge.com', password: '1234' },
      { username: 'minsko.phd@gmail.com', password: '1234' },
    ];

    // 유효성 검사
    const isValidUser = users.some(
      (user) => user.username === username && user.password === password
    );

    if (isValidUser) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/omniverse');
      onClose(); // 팝업 닫기
    } else {
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          textAlign: 'center',
          maxWidth: '400px',
          padding: '20px',
          background: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          margin: 'auto',
        }}
      >
        {/* 로고 */}
        <div style={{ marginBottom: '20px' }}>
          <img src={logo} alt="Logo" style={{ width: '120px' }} />
        </div>

        {/* 로그인 제목 */}
        <h2 style={{ textAlign: 'center', fontSize: '20px', marginBottom: '20px', color: '#c50c2e' }}>
          로그인
        </h2>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디 (ex. name@lge.com)" // 예시 텍스트 추가
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#c50c2e',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            로그인
          </button>
        </form>

        {/* 오류 메시지 */}
        {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}

        {/* 비밀번호 찾기 링크 */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a
            href="#"
            style={{
              color: '#c50c2e',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            비밀번호 찾기
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
