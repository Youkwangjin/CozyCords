import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/MemberList.css';

function AdminUserInfoList() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchAndSetMembers = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get('/api/user/list', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setMembers(response.data);
            } catch (error) {
                console.error("회원 정보를 불러오는데 실패했습니다.", error);
            }
        };
        fetchAndSetMembers().catch(error => {
            console.error("회원 정보 불러오기 중 오류 발생", error);
        });
    }, []);

    return (
        <div className="board-container">
            <div className="customer-banner">
                <div className="title-container">
                    <h2>이용자 회원 정보 확인 <span className="member-count">({members.length}명)</span></h2>
                </div>
            </div>
            <table className="info-table">
                <thead>
                <tr>
                    <th>회원 아이디</th>
                    <th>회원 이름</th>
                    <th>회원 닉네임</th>
                    <th>회원 나이</th>
                    <th>회원 성별</th>
                    <th>회원 전화번호</th>
                    <th>회원 주소</th>
                    <th>수정하기</th>
                    <th>삭제하기</th>
                </tr>
                </thead>
                <tbody>
                {members.map(member => (
                    <tr key={member.userId}>
                        <td>{member.userId}</td>
                        <td>{member.userName}</td>
                        <td>{member.userNickname}</td>
                        <td>{member.userAge}</td>
                        <td>{member.userGender}</td>
                        <td>{member.userTel}</td>
                        <td>{member.userAddress}</td>
                        <td>
                            <button className="update-button" onClick={() => alert('수정 기능은 구현되지 않았습니다.')}>수정</button>
                        </td>
                        <td>
                            <button className="delete-button" onClick={() => alert('삭제 기능은 구현되지 않았습니다.')}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminUserInfoList;