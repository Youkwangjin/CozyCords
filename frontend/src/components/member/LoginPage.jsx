import React, {useEffect, useState} from "react";
import './LoginPage.css';

export default function LoginPage() {
    const [userid, setUserId] = useState('');
    const [password, setPassword] =  useState('');
    const [useridValid, setUserIdValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const handleUserid = (e) => {
        const newId = e.target.value;
        setUserId(newId);
        const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
        if(regex.test(newId)) {
            setUserIdValid(true);
        } else {
            setUserIdValid(false);
        }
    }

    const handlePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
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


    return (
        <div className="page">
            <div className="titleWrap">로그인</div>

            <div className="contentWrap">
                <div className="inputTitle">아이디</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        name="userid"
                        value={userid}
                        placeholder="abcd1234"
                        onChange={handleUserid}/>
                </div>
                <div className="errorMessageWrap">
                    {
                        !useridValid && userid.length > 0 && (
                            <div>올바른 아이디를 입력해주세요.</div>
                        )
                    }
                </div>
                <div style={{marginTop: "26px"}} className="inputTitle">비밀번호</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        name="password"
                        value={password}
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                        onChange={handlePassword}/>
                </div>
                <div className="errorMessageWrap">
                    {
                        !passwordValid && password.length > 0 && (
                            <div>올바른 비밀번호를 입력해주세요.</div>
                        )
                    }
                </div>
                <div>
                    <button disabled={notAllow} className="bottomButton">확인</button>
                </div>
            </div>
        </div>
    )
}