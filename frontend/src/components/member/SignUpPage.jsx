import React, { useEffect, useState } from "react";
import './MemberPage.css';

export default function LoginPage() {
    const [user_id, setUserId] = useState('');
    const [user_pwd, setUserPwd] =  useState('');
    const [user_name, setUserName] = useState('');
    const [user_tel, setUserTel] = useState('');

    const [userIdValid, setUserIdValid] = useState(false);
    const [userPwdValid, setUserPwdValid] = useState(false);
    const [userNameValid, setUserNameValid] = useState(false);
    const [userTelValid, setUserTelValid] = useState(false);

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
            setUserPwdValid(true);
        } else {
            setUserPwdValid(false);
        }
    }

    const handleUserName = (e) => {
        const newName = e.target.value;
        setUserName(newName);
        const regex = /^[가-힣]+$/;
        if(regex.test(newName)) {
            setUserNameValid(true);
        } else {
            setUserNameValid(false);
        }
    }

    const handleUserTel = (e) => {
        const newTel = e.target.value;
        setUserTel(newTel);
        const regex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
        if(regex.test(newTel)) {
            setUserTelValid(true);
        } else {
            setUserTelValid(false);
        }
    }

    useEffect(() => {
        if(userIdValid && userPwdValid && userNameValid && userTelValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [userIdValid, userPwdValid, userNameValid, userTelValid]);


    return (
        <div className="page">
            <div className="titleWrap">회원가입</div>
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
                        !userIdValid && user_id.length > 0 && (
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
                        !userPwdValid && user_pwd.length > 0 && (
                            <div>올바른 비밀번호를 입력해주세요.</div>
                        )
                    }
                </div>
                <div style={{marginTop: "26px"}} className="inputTitle">이름</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        name="user_name"
                        value={user_name}
                        placeholder="이름을 입력해주세요."
                        onChange={handleUserName}/>
                </div>
                <div className="errorMessageWrap">
                    {
                        !userNameValid && user_name.length > 0 && (
                            <div>올바른 이름을 입력해주세요.</div>
                        )
                    }
                </div>
                <div style={{marginTop: "26px"}} className="inputTitle">닉네임</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        name="user_pwd"
                        placeholder="닉네임을 입력해주세요."/>
                </div>
                <div style={{marginTop: "26px"}} className="inputTitle">나이</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        name="user_age"
                        placeholder="나이를 입력해주세요."/>
                </div>
                <div style={{marginTop: "26px"}} className="inputTitle">성별</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        name="user_name"
                        placeholder="성별을 입력해주세요."/>
                </div>
                <div style={{marginTop: "26px"}} className="inputTitle">전화번호</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        name="user_tel"
                        value={user_tel}
                        placeholder="전화번호를 입력해주세요."
                        onChange={handleUserTel}/>
                </div>
                <div className="errorMessageWrap">
                    {
                        !userTelValid && user_tel.length > 0 && (
                            <div>올바른 전화번호를 입력해주세요.</div>
                        )
                    }
                </div>
                <div style={{marginTop: "26px"}} className="inputTitle">주소</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        name="user_address"
                        placeholder="주소를 입력해주세요."/>
                </div>
                <div>
                    <button disabled={notAllow} className="bottomButton">확인</button>
                </div>
            </div>
        </div>
    )
}