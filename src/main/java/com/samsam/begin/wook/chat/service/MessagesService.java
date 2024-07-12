package com.samsam.begin.wook.chat.service;

import com.samsam.begin.wook.chat.dto.MessageDTO;
import com.samsam.begin.wook.chat.entity.CHATROOM;
import com.samsam.begin.wook.chat.entity.MESSAGE;
import com.samsam.begin.wook.chat.repository.ChatRoomRepository;
import com.samsam.begin.wook.chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MessagesService {

    private final MessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public MessagesService(MessageRepository messageRepository, ChatRoomRepository chatRoomRepository, SimpMessagingTemplate messagingTemplate) {
        this.messageRepository = messageRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public void saveMessage(MessageDTO messageDTO) {
        // 채팅방을 DB에서 조회
        CHATROOM chatRoom = chatRoomRepository.findById(messageDTO.getRoomId()).orElseThrow(() ->
                new IllegalArgumentException("Invalid chat room ID"));

        LocalDateTime now = LocalDateTime.now();

        MESSAGE message = new MESSAGE(chatRoom, messageDTO.getSellerId(), messageDTO.getBuyerId(), messageDTO.getMsgContent(), messageDTO.getWriter(), now, false);
        messageRepository.save(message);

        // 메시지를 브로드캐스트
        broadcastMessage(convertToDTO(message));
    }

    private void broadcastMessage(MessageDTO messageDTO) {
        String destination = String.format("/sub/chat/%s", messageDTO.getRoomId());
        messagingTemplate.convertAndSend(destination, messageDTO);
    }

    public List<MessageDTO> getMessagesByRoomId(Long roomId) {
        List<MESSAGE> messages = messageRepository.findByChatRoomRoomIdOrderByTimestampAsc(roomId);
        return messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private MessageDTO convertToDTO(MESSAGE message) {
        return new MessageDTO(
                message.getBuyerId(),
                message.getSellerId(),
                message.getMsgContent(),
                message.getChatRoom().getRoomId(),
                message.getWriter(),
                message.getTimestamp(),
                message.isRead()
        );
    }

    public void markMessagesAsRead(Long roomId, String userId) {
        List<MESSAGE> messages = messageRepository.findByChatRoomRoomIdAndWriterNot(roomId, userId);
        for (MESSAGE message : messages) {
            if (!message.isRead()) {
                message.setRead(true);
                messageRepository.save(message);
                broadcastMessage(convertToDTO(message)); // 읽음 상태를 브로드캐스트
            }
        }
    }

    public int getUnreadMessagesCount(Long roomId, String userId) {
        return messageRepository.countByChatRoomRoomIdAndWriterNotAndReadFalse(roomId, userId);
    }
}
