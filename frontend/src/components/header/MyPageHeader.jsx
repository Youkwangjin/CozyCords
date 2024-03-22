import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../AuthContext';
import '../../style/Header.css';

function MyPageHeader() {
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const userNo = localStorage.getItem('userNo');

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userNo');
        setIsLoggedIn(false);
        navigate('/');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="/logo.jpg" alt="Logo"/>
                </Link>
            </div>
            <nav className="navigation">
                <Link to="/">Home</Link>
                <Link to="/community">공지사항</Link>
                <Link to="/community">커뮤니티</Link>
                <div className="dropdown">
                    <button onClick={toggleDropdown} className="dropBtn">마이페이지</button>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <Link to={`/profile/update/${userNo}`} className="dropdown-item">회원수정</Link>
                            <Link to={`/profile/delete/${userNo}`} className="dropdown-item">회원탈퇴</Link>
                        </div>
                    )}
                </div>
            </nav>
            <div className="header-links">
                <button onClick={handleLogout} className="btn-signup">로그아웃</button>
            </div>
        </header>
    );
}

export default MyPageHeader;
