import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


function MyPageHeader() {
    return (
        <header className="header">
            <div className="logo">
                <img src="/logo.jpg" alt="Logo"/>
            </div>
            <nav className="navigation">
                <Link to="/community">Home</Link>
                <Link to="/community">공지사항</Link>
                <Link to="/community">커뮤니티</Link>
                <Link to="/community">마이 페이지</Link>
            </nav>
            <div className="header-links">
                <Link to="/signup" className="btn-signup">로그아웃</Link>
            </div>
        </header>
    );
}

export default MyPageHeader;