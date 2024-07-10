import React, { useState } from 'react';
import axios from 'axios';

const CommentList = ({ comments, fetchComments }) => {
    const [editMode, setEditMode] = useState(null); // 수정 모드 상태
    const [updatedContent, setUpdatedContent] = useState(''); // 수정할 댓글 내용 상태

    const showUpdateForm = (commentId) => {
        setEditMode(commentId); // 수정 모드 활성화
        setUpdatedContent(comments.find(comment => comment.commentId === commentId).content); // 수정할 댓글 내용 초기화
    };

    const cancelUpdate = () => {
        setEditMode(null); // 수정 모드 비활성화
        setUpdatedContent(''); // 수정할 댓글 내용 초기화
    };

    // 댓글 수정
    const submitUpdate = async (commentId, updatedContent) => {
        try {
            const response = await axios.put(`/api/comments/${commentId}`, {
                content: updatedContent,
                member_id: sessionStorage.getItem("member_id")
            }, {
                headers: {"Content-Type": "application/json"}
            });
            console.log('댓글 수정 성공:', response.data);
            setEditMode(null);
            fetchComments();
        } catch (error) {
            console.error('댓글 수정 실패:', error);
            if (error.response && error.response.status === 403) {
                alert('권한이 없습니다.');
            } else if (error.response && error.response.status === 404) {
                alert('댓글을 찾을 수 없습니다.');
            } else {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    // 댓글 삭제
    const deleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`/api/comments/${commentId}/${sessionStorage.getItem("member_id")}`);
            console.log('댓글 삭제 성공:', response.data);
            fetchComments(); // 삭제 후 댓글 목록 다시 불러오기
            alert('댓글이 삭제되었습니다.');
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
            if (error.response && error.response.status === 403) {
                alert('권한이 없습니다.');
            } else if (error.response && error.response.status === 404) {
                alert('댓글을 찾을 수 없습니다.');
            } else {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div id="commentList" className="mt-4">
            {comments.map(comment => (
                <div className="comment" key={comment.commentId}>
                    {editMode === comment.commentId ? (
                        // 수정 폼 표시
                        <div className="update-form">
                            <textarea
                                rows="3"
                                cols="50"
                                value={updatedContent}
                                onChange={(e) => setUpdatedContent(e.target.value)}
                            ></textarea>
                            <br />
                            <button onClick={() => submitUpdate(comment.commentId, updatedContent)}>수정 완료</button>
                            <button onClick={() => cancelUpdate()}>취소</button>
                        </div>
                    ) : (
                        // 댓글 내용 표시
                        <>
                            <p><strong>{comment.userId}</strong>: {comment.content}</p>
                            <p className="comment-date">{formatDate(new Date(comment.commentDate))}</p>

                            {/* 댓글 작성자와 member_id 가 일치할 때만 버튼 표시 */}
                            { comment.userId === sessionStorage.getItem("member_id") ?
                                <div className="comment-actions">
                                    <button onClick={() => showUpdateForm(comment.commentId)}>수정</button>
                                    <button onClick={() => deleteComment(comment.commentId)}>삭제</button>
                                </div>
                                : <div></div>
                            }
                            {/* <div className="comment-actions">
                                <button onClick={() => showUpdateForm(comment.commentId)}>수정</button>
                                <button onClick={() => deleteComment(comment.commentId)}>삭제</button>
                            </div> */}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentList;
