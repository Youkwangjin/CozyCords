import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import IndexPage from './components/home/IndexPage';
import Header from './components/header/Header';
import MyPageHeader from './components/header/MyPageHeader';
import LoginPage from './components/member/LoginPage';
import SignUpPage from './components/member/SignUpPage';
import MyUpdatePage from './components/member/MyUpdatePage';
import MyDeletePage from './components/member/MyDeletePage';
import AdminLoginPage from "./components/admin/AdminLoginPage";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {/* 메인 홈페이지 라우트 */}
                        <Route path="/" element={<WithHeader><IndexPage /></WithHeader>} />
                        {/* 관리자 페이지 라우트 */}
                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        {/* 사용자 라우트 */}
                        <Route path="/login" element={<WithHeader><LoginPage /></WithHeader>} />
                        <Route path="/signup" element={<WithHeader><SignUpPage /></WithHeader>} />
                        <Route path="/profile/update" element={<WithHeader><MyUpdatePage /></WithHeader>} />
                        <Route path="/profile/delete" element={<WithHeader><MyDeletePage /></WithHeader>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

function WithHeader({ children }) {
    return (
        <>
            <AuthComponent />
            {children}
        </>
    );
}

function AuthComponent() {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <MyPageHeader /> : <Header />;
}

export default App;
