package com.samsam.begin.wook.chat.service;

import com.samsam.begin.wook.chat.entity.*;
import com.samsam.begin.wook.chat.repository.ChatRoomRepository;
import com.samsam.begin.wook.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public CHATROOM createChatRoom(String sellerId, String buyerId, String roomTitle) {
    	
    	Optional<CHATROOM> existingChatRoom = chatRoomRepository.findBySellerIdAndBuyerId(sellerId, buyerId);
        if (existingChatRoom.isPresent()) {
            return existingChatRoom.get();
        }
    	
    	 
        CHATROOM chatRoom = new CHATROOM(sellerId, buyerId, roomTitle);
        return chatRoomRepository.save(chatRoom);
    }

    public CHATROOM getChatRoom(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId).orElse(null);
    }
    
    public List<CHATROOM> getChatRoomsByUserId(String userId) {
        return chatRoomRepository.findBySellerIdOrBuyerId(userId, userId);
    }
}
