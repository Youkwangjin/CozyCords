import React, {useEffect, useState} from 'react';
import '../../style/MemberPage.css';

export default function AdminLoginPage() {
    const [adminId, setAdminId] = useState('');
    const [adminPwd, setAdminPwd] = useState('');
    const [adminIdValid, setAdminIdValid] = useState(false);
    const [adminPwdValid, setAdminPwdValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [adminIdError, setAdminIdError] = useState('');
    const [adminPwdError, setAdminPwdError] = useState('');




    const handleAdminId = (e) => {
        const newId = e.target.value;
        setAdminId(newId);
        const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
        setAdminIdValid(regex.test(newId));
    }

    const handleAdminPwd = (e) => {
        const newPassword = e.target.value;
        setAdminPwd(newPassword);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,16}$/;
        setAdminPwdValid(regex.test(newPassword));
    }

    useEffect(() => {
        setNotAllow(!(adminIdValid && adminPwdValid));
    }, [adminIdValid, adminPwdValid]);

    const handleAdminLogin = async (event) => {
        event.preventDefault();
        setAdminIdError('');
        setAdminPwdError('');
    };


    return (
        <div className="page">
            <form onSubmit={handleAdminLogin}>
                <div className="titleWrap">관리자 로그인</div>

                <div className="contentWrap">
                    <div className="inputTitle">아이디</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="adminId"
                            value={adminId}
                            placeholder="abcd1234"
                            onChange={handleAdminId}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !adminIdValid && adminId.length > 0 && (
                                <div>관리자님 올바른 아이디를 입력해주세요.</div>
                            )
                        }
                        {
                            adminIdError && (
                                <div>{adminIdError}</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">비밀번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            type="password"
                            name="adminPwd"
                            value={adminPwd}
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            onChange={handleAdminPwd}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !adminPwdValid && adminPwd.length > 0 && (
                                <div>관리자님 올바른 비밀번호를 입력해주세요.</div>
                            )
                        }
                        {
                            adminPwdError && (
                                <div>{adminPwdError}</div>
                            )
                        }
                    </div>
                    <div>
                        <button type="submit" disabled={notAllow} className="bottomButton">로그인</button>
                    </div>
                </div>
            </form>
        </div>
    );
}