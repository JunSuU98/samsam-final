package com.samsam.begin.wook.chat.dto;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatMessageDto {
    private String writer;
    private String message;
    private Long roomId;
    private LocalDateTime timestamp;

    // Constructors, getters, setters, toString methods
    public ChatMessageDto(String writer, String message, Long roomId) {
        this.writer = writer;
        this.message = message;
        this.roomId = roomId;
        this.timestamp = LocalDateTime.now();
    }
}
