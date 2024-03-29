import React from 'react';
import {Link} from 'react-router-dom';
import '../../style/header/Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="/logo.jpg" alt="Logo"/>
                </Link>
            </div>
            <nav className="navigation">
                <Link to="/board">공지사항</Link>
                <Link to="/community">커뮤니티</Link>
            </nav>
            <div className="header-links">
                <Link to="/login" className="btn-login">로그인</Link>
                <Link to="/signup" className="btn-signup">회원가입</Link>
            </div>
        </header>
    );
}

export default Header;
