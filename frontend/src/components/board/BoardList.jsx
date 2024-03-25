import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/board/BoardList.css';

function BoardList() {
    // 예시 데이터 (추후 백엔드 API 설계 해야함!)
    const [boardList] = useState([
        { boardId: 1, boardTitle: '첫 번째 게시글', boardWriter: '작성자1', boardCreateTime: '2023-03-23', boardHits: 100 },
        { boardId: 2, boardTitle: '두 번째 게시글', boardWriter: '작성자2', boardCreateTime: '2023-03-24', boardHits: 150 },

    ]);

    return (
        <div className="board-list-container">
            <div className="board-list-header">
                <h3 className="board-list-title">공지 목록</h3>
                <div className="board-list-link">
                    <Link to="/board/write" className="btn btn-primary">작성하기</Link>
                </div>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>순번</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                </tr>
                </thead>
                <tbody>
                {boardList.map(board => (
                    <tr key={board.boardId}>
                        <td>{board.boardId}</td>
                        <td><Link to={`/board/detail/${board.boardId}`}>{board.boardTitle}</Link></td>
                        <td>{board.boardWriter}</td>
                        <td>{board.boardCreateTime}</td>
                        <td>{board.boardHits}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BoardList;
