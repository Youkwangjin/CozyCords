// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('광진아 오타 확인해라');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        setIsLoggedIn(false);
        // 로그아웃 로직 구현
    };

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
