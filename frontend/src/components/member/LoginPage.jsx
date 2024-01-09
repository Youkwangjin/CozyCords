import React, { useEffect, useState } from "react";
import './MemberPage.css';
import axios from 'axios';

export default function LoginPage() {
    const [user_id, setUserId] = useState('');
    const [user_pwd, setUserPwd] =  useState('');
    const [useridValid, setUserIdValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const handleUserId = (e) => {
        const newId = e.target.value;
        setUserId(newId);
        const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
        if(regex.test(newId)) {
            setUserIdValid(true);
        } else {
            setUserIdValid(false);
        }
    }

    const handleUserPwd = (e) => {
        const newPassword = e.target.value;
        setUserPwd(newPassword);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,16}$/;
        if(regex.test(newPassword)) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
    }

    useEffect(() => {
        if(useridValid && passwordValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [useridValid, passwordValid]);

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!notAllow) {
            try {
                const response = await axios.post('http://localhost:8080/api/login', {
                    userId: user_id,
                    password: user_pwd,
                });

                // 로그인 성공, Jwt를 로컬 스토리지에 저장
                const { token } = response.data;
                localStorage.setItem('userToken', token);
                window.location.href = '/';
            } catch (error) {
                console.error("로그인 실패", error);
            }
        }
    };


    return (
        <div className="page">
            <form onSubmit={handleLogin}>
                <div className="titleWrap">로그인</div>

                <div className="contentWrap">
                    <div className="inputTitle">아이디</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="user_id"
                            value={user_id}
                            placeholder="abcd1234"
                            onChange={handleUserId}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !useridValid && user_id.length > 0 && (
                                <div>올바른 아이디를 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">비밀번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="user_pwd"
                            value={user_pwd}
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            onChange={handleUserPwd}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !passwordValid && user_pwd.length > 0 && (
                                <div>올바른 비밀번호를 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div>
                        <button disabled={notAllow} onClick={handleLogin} className="bottomButton">로그인</button>
                    </div>
                </div>
            </form>
        </div>
)
}