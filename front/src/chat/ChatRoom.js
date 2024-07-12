import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import './ChatRoom.css'; // CSS 파일을 import 합니다.

import MemberHeader from '../member/page/MemberHeader';

const ChatRoom = ({handleStorageChange, memberId}) => {
    const { roomId } = useParams(); // 채팅방 ID
    const [message, setMessage] = useState(''); // 메시지
    const [chatMessages, setChatMessages] = useState([]); // 채팅 메시지 목록
    const [buyerId, setBuyerId] = useState(''); // 구매자 ID
    const [sellerId, setSellerId] = useState(''); // 판매자 ID
    const [userId, setUserId] = useState(''); // 현재 사용자 ID
    const [roomTitle, setRoomTitle] = useState(''); // 채팅방 제목
    const stompClientRef = useRef(null); // WebSocket 클라이언트 참조
    const messagesEndRef = useRef(null); // 메시지 끝 참조
    const receivedMessages = useRef(new Set()); // 수신된 메시지 ID를 저장하는 Set

    useEffect(() => {
        fetchChatRoomInfo();

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
                stompClientRef.current = null;
            }
        };
    }, [roomId]);

    const fetchChatRoomInfo = async () => {
        try {
            const storedUserId = sessionStorage.getItem('member_id'); // 세션 스토리지에서 현재 사용자 ID 가져오기
            setUserId(storedUserId);

            const response = await axios.get(`/enter/${roomId}`, {
                params: { userId: storedUserId }
            });
            const chatRoomInfo = response.data;

            // 구매자 ID와 판매자 ID 설정
            setBuyerId(chatRoomInfo.buyerId);
            setSellerId(chatRoomInfo.sellerId);
            setRoomTitle(chatRoomInfo.roomTitle); // 채팅방 제목 설정

            // 기존 메시지 불러오기
            const messagesResponse = await axios.get(`/messages/${roomId}`);
            setChatMessages(messagesResponse.data);

            // 메시지 읽음 상태 업데이트
            markMessagesAsRead(storedUserId);

            // WebSocket 연결
            connectWebSocket(storedUserId, chatRoomInfo.sellerId);
        } catch (error) {
            console.error('채팅방 정보를 가져오는 중 오류 발생:', error);
        }
    };

    const connectWebSocket = (storedUserId, sellerId) => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
        }

        const socket = new SockJS('http://localhost:8088/stomp/chat');
        const stompClient = new StompJs.Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                'auth-token': 'spring-chat-auth-token',
                'user-id': storedUserId,
                'seller-id': sellerId,
            },
            debug: str => {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = () => {
            console.log('WebSocket connected');
            stompClientRef.current = stompClient;

            // 채팅방 구독
            stompClient.subscribe(`/sub/chat/${roomId}`, message => {
                const chatMessage = JSON.parse(message.body);
                console.log('Received message:', chatMessage);

                // 메시지 ID를 기준으로 중복 수신 방지
                if (!receivedMessages.current.has(chatMessage.timestamp + chatMessage.writer)) {
                    receivedMessages.current.add(chatMessage.timestamp + chatMessage.writer);
                    setChatMessages(prevMessages => [...prevMessages, chatMessage]);

                    // 새로운 메시지를 받았을 때 읽음 상태 업데이트
                    markMessagesAsRead(storedUserId);
                }
            });
        };

        stompClient.onStompError = frame => {
            console.error('WebSocket connection error:', frame);
            scheduleReconnect();
        };

        stompClient.activate();
    };

    const markMessagesAsRead = async (userId) => {
        try {
            await axios.post('/messages/read', { roomId: parseInt(roomId), userId });
        } catch (error) {
            console.error('메시지 읽음 상태 업데이트 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    // 메시지 전송
    const sendMessage = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            const chatMessage = {
                buyerId: buyerId,
                sellerId: sellerId,
                msgContent: message,
                roomId: roomId,
                writer: userId, // 작성자 설정
                timestamp: new Date().toISOString() // 메시지 시간 설정
            };

            console.log('Sending message:', chatMessage);

            stompClientRef.current.publish({
                destination: `/pub/chat/${roomId}`,
                body: JSON.stringify(chatMessage),
            });

            setMessage('');
        } else {
            console.warn('WebSocket is not connected');
        }
    };

    // 재연결 스케줄링
    const scheduleReconnect = () => {
        console.log('STOMP: Scheduling reconnection in 5000ms');
        setTimeout(() => {
            fetchChatRoomInfo();
        }, 5000);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 구매자 ID와 판매자 ID가 설정되지 않은 경우 로딩 표시
    if (!buyerId || !sellerId) {
        return <div>Loading...</div>;
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chat-room-container">
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>
            <div className="chat-room-header">{roomTitle}</div>
            <div className="chat-room-messages">
                <ul>
                    {chatMessages.map((msg, index) => (
                        <li key={index} className={msg.writer === userId ? 'my-message' : 'other-message'}>
                            <div><strong>{msg.writer}:</strong> {msg.msgContent}</div>
                            <div className="message-timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
                            {msg.writer === userId && msg.read && <div className="message-read-status">읽음</div>}
                        </li>
                    ))}
                </ul>
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-room-input">
                <input
                    type="text"
                    placeholder="메시지를 입력하세요"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={sendMessage}>메시지 보내기</button>
            </div>
        </div>
    );
};

export default ChatRoom;
