import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ infoNumber, fetchComments }) => {
    const [commentContent, setCommentContent] = useState('');

    const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/api/comments', {
            content: commentContent,
            infoNumber: parseInt(infoNumber),
            member_id: sessionStorage.getItem("member_id")
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log('Comment submitted successfully:', response.data);
        setCommentContent('');
        fetchComments();
    } catch (error) {
        console.error('Error submitting comment:', error);
        if (error.response && error.response.status === 401) {
            alert('로그인이 필요합니다.');
            // 로그인 페이지로 이동하는 코드 추가
        }
    }
};

    const handleCommentChange = (e) => {
        setCommentContent(e.target.value);
    };

    return (
        <form onSubmit={handleCommentSubmit} className="mt-4">
            <div className="form-group">
                <label htmlFor="commentContent">댓글 작성</label>
                <textarea
                    className="form-control"
                    id="commentContent"
                    rows="3"
                    value={commentContent}
                    onChange={handleCommentChange}
                    required
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">댓글 작성</button>
        </form>
    );
};

export default CommentForm;
