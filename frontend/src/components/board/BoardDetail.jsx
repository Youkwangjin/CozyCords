import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BoardDetail() {
    return (
        <div style={{ margin: '20px' }}>
            <h3 style={{ textAlign: 'center' }}>글 작성하기</h3>
            <form>
                <table className="table" style={{ width: '95%' }}>
                    <tbody>
                    <tr>
                        <td>작성자</td>
                        <td>
                            <input type="text" name="boardWriter" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td>
                            <input type="password" name="boardPassword" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td>글제목</td>
                        <td>
                            <input type="text" name="boardTitle" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td>글내용</td>
                        <td>
                            <textarea rows="5" className="form-control" name="boardContents" />
                        </td>
                    </tr>
                    <tr>
                        <td>파일 첨부하기</td>
                        <td>
                            <input type="file" name="boardFile" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={{ textAlign: 'center' }}>
                            <button type="submit" className="btn btn-primary">작성하기</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default BoardDetail;
