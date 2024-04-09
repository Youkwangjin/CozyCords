import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../../style/member/MemberPage.css';

export default function LoginPage() {
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userTel, setUserTel] = useState('');
    const [userHeight, setUserHeight] = useState('');
    const [userWeight, setUserWeight] = useState('');
    const [userShoeSize, setUserShoeSize] = useState('');

    const [userIdValid, setUserIdValid] = useState(null);
    const [userPwdValid, setUserPwdValid] = useState(false);
    const [userNameValid, setUserNameValid] = useState(false);
    const [userGenderValid, setUserGenderValid] = useState(false);
    const [userTelValid, setUserTelValid] = useState(false);
    const [userHeightValid, setUserHeightValid] = useState(false);
    const [userWeightValid, setUserWeightValid] = useState(false);
    const [userShoeSizeValid, setUserShoeSizeValid] = useState(false);
    const [userIdMessage, setUserIdMessage] = useState('');

    const [notAllow, setNotAllow] = useState(true);
    let debounceCheck; // 디바운싱 타이머 변수

    useEffect(() => {
        return () => {
            clearTimeout(debounceCheck); // 컴포넌트 언마운트 시 타이머 초기화
        };
    }, [debounceCheck]);

    const handleUserId = (e) => {
        const newId = e.target.value;
        setUserId(newId);
        const regex = /^[a-z]+[a-z0-9._%+-]{0,29}@[a-z0-9.-]+\.[a-z]{2,4}$|^[a-z]+[a-z0-9]{5,29}$/gi;

        if (regex.test(newId)) {
            clearTimeout(debounceCheck); // 이전 타이머 초기화
            debounceCheck = setTimeout(async () => {
                // 디바운싱 타이머 설정
                try {
                    const response = await axios.get(`http://localhost:8080/api/check-userId?userId=${newId}`);
                    if (response.data === true) {
                        setUserIdValid(true);
                        setUserIdMessage("사용 가능한 아이디입니다.");
                    } else {
                        setUserIdValid(false);
                        setUserIdMessage("이미 사용 중인 아이디입니다.");
                    }
                } catch (error) {
                    console.error("아이디 중복 에러", error);
                    setUserIdValid(false);
                    setUserIdMessage("아이디 중복 검사에 실패했습니다.");
                }
            }, 500); // 0.5초 대기
        } else {
            setUserIdValid(false);
            setUserIdMessage("올바른 아이디를 입력해주세요.");
        }
    };


    const handleUserPwd = (e) => {
        const newPassword = e.target.value;
        setUserPwd(newPassword);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,16}$/;
        if (regex.test(newPassword)) {
            setUserPwdValid(true);
        } else {
            setUserPwdValid(false);
        }
    }

    const handleUserName = (e) => {
        const newName = e.target.value;
        setUserName(newName);
        const regex = /^[가-힣]+$/;
        if (regex.test(newName)) {
            setUserNameValid(true);
        } else {
            setUserNameValid(false);
        }
    }
    const handleUserGender = (e) => {
        const newGender = e.target.value;
        setUserGender(newGender);
        if (newGender === '남자' || newGender === '여자') {
            setUserGenderValid(true);
        } else {
            setUserGenderValid(false);
        }
    }

    const handleUserTel = (e) => {
        const newTel = e.target.value.replace(/-/g, '');
        setUserTel(newTel);
        const regex = /^01[01789][1-9]\d{6,7}$/;
        if (regex.test(newTel)) {
            setUserTelValid(true);
        } else {
            setUserTelValid(false);
        }
    }
    const handleUserAge = (e) => setUserAge(e.target.value);

    const handleUserHeight = (e) => {
        const newHeight = e.target.value;
        setUserHeight(newHeight);
        const regex = /^[0-9]+$/;
        const height = parseInt(newHeight, 10);
        if (regex.test(newHeight) && height >= 100 && height <= 250) {
            setUserHeightValid(true);
        } else {
            setUserHeightValid(false);
        }
    }

    const handleUserWeight = (e) => {
        const newWeight = e.target.value;
        setUserWeight(newWeight);
        const regex = /^[0-9]+$/;
        const weight = parseInt(newWeight, 10);
        if (regex.test(newWeight) && weight >= 100 && weight <= 250) {
            setUserWeightValid(true);
        } else {
            setUserWeightValid(false);
        }
    }

    const handleUserShoeSize = (e) => {
        const newShoeSize = e.target.value;
        setUserShoeSize(newShoeSize);
        const regex = /^[0-9]+$/;
        const shoeSize = parseInt(newShoeSize, 10);
        if (regex.test(newShoeSize) && shoeSize >= 200 && shoeSize <= 320 && shoeSize % 5 === 0) {
            setUserShoeSizeValid(true);
        } else {
            setUserShoeSizeValid(false);
        }
    }


    useEffect(() => {
        if (userIdValid && userPwdValid && userNameValid && userGenderValid && userTelValid && userHeight && userWeight
            && userShoeSize) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [userIdValid, userPwdValid, userNameValid, userGenderValid, userTelValid, userHeightValid, userWeightValid,
             userShoeSizeValid]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!notAllow) {
            try {
                await axios.post('http://localhost:8080/api/register', {
                    userId,
                    userPwd,
                    userName,
                    userTel,
                    userAge,
                    userGender,
                    userHeight,
                    userWeight,
                    userShoeSize
                });
                window.location.href = '/login';
            } catch (error) {
                console.error("회원가입 오류", error);
            }
        }
    };


    return (
        <div className="page">
            <form onSubmit={handleSubmit}>
                <div className="titleWrap">회원가입</div>
                <div className="contentWrap">
                    <div className="inputTitle">아이디</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userId"
                            value={userId}
                            placeholder="abcd1234"
                            onChange={handleUserId}/>
                    </div>
                    <div className="errorMessageWrap">
                        {userIdMessage && (
                            <div className={`message ${userIdValid ? 'valid' : 'error'}`}>{userIdMessage}</div>
                        )}
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">비밀번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userPwd"
                            type="password"
                            value={userPwd}
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            onChange={handleUserPwd}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userPwdValid && userPwd.length > 0 && (
                                <div>올바른 비밀번호를 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">이름</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userName"
                            value={userName}
                            placeholder="이름을 입력해주세요."
                            onChange={handleUserName}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userNameValid && userName.length > 0 && (
                                <div>올바른 이름을 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">나이</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userAge"
                            value={userAge}
                            placeholder="나이를 입력해주세요."
                            onChange={handleUserAge}/>
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">성별</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userGender"
                            value={userGender}
                            placeholder="성별을 입력해주세요."
                            onChange={handleUserGender}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userGenderValid && userGender.length > 0 && (
                                <div>성별은 남자 혹은 여자로 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">전화번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userTel"
                            value={userTel}
                            placeholder="전화번호를 입력해주세요."
                            onChange={handleUserTel}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userTelValid && userTel.length > 0 && (
                                <div>올바른 전화번호를 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">키</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userHeight"
                            value={userHeight}
                            placeholder="키를 입력해주세요"
                            onChange={handleUserHeight}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userHeight && userHeight.length > 0 && (
                                <div>올바른 키를 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">몸무게</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userWeight"
                            value={userWeight}
                            placeholder="몸무게를 입력해주세요"
                            onChange={handleUserWeight}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userWeight && userWeight.length > 0 && (
                                <div>올바른 몸무게를 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">신발사이즈</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userShoeSize"
                            value={userShoeSize}
                            placeholder="신발사이즈를 입력해주세요"
                            onChange={handleUserShoeSize}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userShoeSize && userShoeSize.length > 0 && (
                                <div>올바른 신발사이즈를 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div>
                        <button type="submit" disabled={notAllow} className="bottomButton">확인
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}