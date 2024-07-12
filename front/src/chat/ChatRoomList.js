import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ChatRoomList.css'; // CSS 파일을 import 합니다.

import MemberHeader from '../member/page/MemberHeader';

const ChatRoomList = ({handleStorageChange, memberId}) => {
    const [chatRooms, setChatRooms] = useState([]);
    const userId = sessionStorage.getItem('member_id'); // 세션 스토리지에서 사용자 ID 가져오기

    useEffect(() => {
        if (!userId) {
            alert('로그인 후 가능합니다.');
        } else {
            fetchChatRooms();
        }
    }, [userId]);

    const fetchChatRooms = async () => {
        try {
            const response = await axios.get('/chat-rooms', {
                params: { userId }
            });
            const chatRooms = response.data;
            const updatedChatRooms = await Promise.all(
                chatRooms.map(async (room) => {
                    const unreadCount = await fetchUnreadMessagesCount(room.roomId);
                    return { ...room, unreadCount };
                })
            );
            setChatRooms(updatedChatRooms);
        } catch (error) {
            console.error('채팅방 목록을 가져오는 중 오류 발생:', error);
        }
    };

    const fetchUnreadMessagesCount = async (roomId) => {
        try {
            const response = await axios.get(`/messages/unread-count/${roomId}`, {
                params: { userId }
            });
            return response.data.unreadCount;
        } catch (error) {
            console.error('안 읽은 메시지 수를 가져오는 중 오류 발생:', error);
            return 0;
        }
    };

    // 로그인하지 않은 경우 아무것도 렌더링하지 않음
    if (!userId) {
        return null;
    }

    return (
        <div>
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>
            <div className="chat-room-list">
                <h3>내 채팅방 목록</h3>
                <ul>
                    {chatRooms.map(room => (
                        <li key={room.roomId} className="chat-room-item">
                            <Link to={`/chat-room/${room.roomId}`} className="chat-room-link">
                                {room.roomTitle} {room.unreadCount > 0 && <span className="unread-count">{room.unreadCount}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default ChatRoomList;
