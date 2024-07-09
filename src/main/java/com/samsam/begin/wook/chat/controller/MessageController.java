package com.samsam.begin.wook.chat.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.samsam.begin.wook.chat.dto.ChatMessageDto;

@Controller
public class MessageController {

    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    private final SimpMessagingTemplate template;

    public MessageController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/chat/enter")
    public void enter(@Payload ChatMessageDto message) {
        logger.info("Enter message received: {}", message);
        String chatRoomId = "1"; // 고정된 채팅방 번호
        message.setMessage(message.getWriter() + " 님이 채팅방에 입장하셨습니다.");
        template.convertAndSend("/sub/chat/" + chatRoomId, message);
        logger.info("Enter message sent to /sub/chat/{}", chatRoomId);
    }

    @MessageMapping("/chat/message")
    public void message(@Payload ChatMessageDto message) {
        logger.info("Chat message received: {}", message);
        String chatRoomId = "1"; // 고정된 채팅방 번호
        template.convertAndSend("/sub/chat/" + chatRoomId, message);
        logger.info("Chat message sent to /sub/chat/{}", chatRoomId);
    }
}
