import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatStart = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(null);

  const handleChatStart = () => {
    const inputBuyerId = prompt("채팅할 상대방의 ID를 입력하세요:");
    if (!inputBuyerId) return;

    fetch("http://localhost:8088/enter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerId: inputBuyerId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to start chat");
        }
        return response.json();
      })
      .then((data) => {
        console.log("채팅방 생성 완료:", data);
        setRoomId(data.roomId); // 생성된 채팅방의 roomId 설정
        navigate(`/chat-room/${data.roomId}`); // ChatRoom으로 이동
      })
      .catch((error) => {
        console.error("채팅방 생성 오류:", error);
      });
  };

  return (
    <div>
      <h2>채팅 시작하기</h2>
      <button onClick={handleChatStart}>채팅하기</button>
    </div>
  );
};

export default ChatStart;
