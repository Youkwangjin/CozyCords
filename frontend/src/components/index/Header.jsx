import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../AuthContext';

function Header() {
    const { isLoggedIn, logout } = useAuth(); // 로그인 상태와 로그아웃 함수 사용
    return (
        <header className="header">
            <div className="logo">
                <img src="/logo.jpg" alt="Logo"/>
            </div>
            <nav className="navigation">
                <Link to="/community">Home</Link>
                <Link to="/community">회사소개</Link>
                <Link to="/community">미아 서비스</Link>
                <Link to="/community">커뮤니티</Link>

            </nav>
            <div className="header-links">
                {isLoggedIn ? (
                    <>
                        <button onClick={logout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn-login">로그인</Link>
                        <Link to="/signup" className="btn-signup">회원가입</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
