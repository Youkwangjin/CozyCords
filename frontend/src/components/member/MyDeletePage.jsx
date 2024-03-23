import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../../style/member/MemberPage.css';
import {useAuth} from '../../AuthContext';
import {useParams} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function MyUpdatePage() {
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userName, setUserName] = useState('');
    const [userTel, setUserTel] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAddress, setUserAddress] = useState('');

    const [userPwdValid, setUserPwdValid] = useState(null);

    const [notAllow, setNotAllow] = useState(true);
    const {userNo} = useParams();
    const {setIsLoggedIn} = useAuth();

    const handleUserPwd = (e) => {
        const newPassword = e.target.value;
        setUserPwd(newPassword);
        if (newPassword.length > 0) {
            const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,16}$/;
            setUserPwdValid(regex.test(newPassword));
        } else {
            setUserPwdValid(null);
        }
    };

    useEffect(() => {
        setNotAllow(!(userPwdValid !== false));
    }, [userPwdValid]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const config = {
                    headers: {'Authorization': `Bearer ${token}`}
                };
                const response = await axios.get(`http://localhost:8080/api/user/info/${userNo}`, config);
                const userData = response.data;
                setUserId(userData.userId);
                setUserName(userData.userName);
                setUserTel(userData.userTel);
                setUserNickname(userData.userNickname);
                setUserAge(userData.userAge);
                setUserGender(userData.userGender);
                setUserAddress(userData.userAddress);
            } catch (error) {
                console.error("사용자 정보 불러오기 오류", error);
            }
        };
        fetchUserData().catch(console.error);
    }, [userNo]);


    const deleteSubmit = async (event) => {
        event.preventDefault();
        if (!notAllow) {
            try {
                const token = localStorage.getItem('userToken');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                await axios.post('http://localhost:8080/api/user/delete', {
                    userId,
                    userPwd,
                    userName,
                    userTel,
                    userNickname,
                    userAge,
                    userGender,
                    userAddress
                }, config);
                // 관리자 여부를 확인
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const isAdmin = decodedToken["auth"].includes('ROLE_ADMIN');

                    if (isAdmin) {
                        // 관리자인 경우 회원 목록 페이지로 리다이렉션
                        alert('회원 삭제가 정상적으로 완료되었습니다. 회원 목록 페이지로 이동합니다.');
                        window.location.href = '/admin/user/list';
                    } else {
                        // 일반 사용자인 경우 로그인 페이지로 리다이렉션
                        localStorage.removeItem('userToken');
                        setIsLoggedIn(false);
                        alert('그 동안 이용해 주셔서 감사합니다.');
                        window.location.href = '/login';
                    }
                } else {
                    // 토큰이 없는 경우 로그인 페이지로 리다이렉션
                    alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
                    window.location.href = '/login';
                }
            } catch (error) {
                alert('회원 정보 수정에 실패했습니다.');
            }
        }
    };

    return (
        <div className="page">
            <form onSubmit={deleteSubmit}>
                <div className="titleWrap">회원탈퇴</div>
                <div className="contentWrap">
                    <div className="inputTitle">아이디</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userId"
                            value={userId}
                            readOnly
                        />
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">비밀번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            type="password"
                            name="userPwd"
                            value={userPwd}
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            onChange={handleUserPwd}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            userPwdValid === false && (
                                <div className="errorMessage">올바른 비밀번호를 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">이름</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userName"
                            value={userName}
                            readOnly
                        />
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">닉네임</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userNickname"
                            value={userNickname}
                            readOnly
                        />
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">나이</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userAge"
                            value={userAge}
                            readOnly
                        />
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">성별</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userGender"
                            value={userGender}
                            readOnly
                        />
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">전화번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userTel"
                            value={userTel}
                            readOnly
                        />
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">주소</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="user_address"
                            value={userAddress}
                            readOnly
                        />
                    </div>
                    <div>
                        <button type="submit" disabled={notAllow} className="bottomButton">회원 탈퇴
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}