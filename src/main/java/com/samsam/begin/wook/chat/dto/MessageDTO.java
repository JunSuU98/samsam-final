package com.samsam.begin.wook.chat.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private String buyerId;
    private String sellerId;
    private String msgContent;
    private Long roomId;
    private String writer;
    private LocalDateTime timestamp;
    private boolean read;
}
