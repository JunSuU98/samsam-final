package com.samsam.begin.wook.chat.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Data;

@Data
public class ChatRoomDTO {
	
 private Long roomId;
 private	String sellerId;
 private	String buyerId;
 private	LocalDateTime createdAt;
 private String roomTitle;

 public ChatRoomDTO() {
     // 기본 생성자 추가
 }
 
 
 public ChatRoomDTO(Long roomId, String sellerId, String buyerId,  String roomTitle, LocalDateTime createdAt) {
     this.roomId = roomId;
     this.sellerId = sellerId;
     this.buyerId = buyerId;
     this.createdAt = createdAt;
     this.roomTitle = roomTitle;
 }
}
