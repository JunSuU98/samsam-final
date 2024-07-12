package com.samsam.begin.wook.chat.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class MESSAGE {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MESSAGE_SEQ_GEN")
    @SequenceGenerator(name = "MESSAGE_SEQ_GEN", sequenceName = "message_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id" , nullable = false)
    private CHATROOM chatRoom;

    @Column(name = "seller_id")
    private String sellerId;

    @Column(name = "buyer_id")
    private String buyerId;

    @Column(name = "MSG_CONTENT")
    private String msgContent;
    
    @Column(name = "WRITER")
    private String writer;  // 메시지 작성자

    @Column(name = "TIMESTAMP")
    private LocalDateTime timestamp;

    @Column(name = "READ")
    private boolean read;  // 메시지 읽음 여부

    // Default constructor
    public MESSAGE() {}

    // Constructor
    public MESSAGE(CHATROOM chatRoom, String sellerId, String buyerId, String msgContent , String writer, LocalDateTime timestamp, boolean read) {
        this.chatRoom = chatRoom;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.msgContent = msgContent;
        this.writer = writer;
        this.timestamp = timestamp;
        this.read = read;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CHATROOM getChatRoom() {
        return chatRoom;
    }

    public void setChatRoom(CHATROOM chatRoom) {
        this.chatRoom = chatRoom;
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public String getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public String getMsgContent() {
        return msgContent;
    }

    public void setMsgContent(String msgContent) {
        this.msgContent = msgContent;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }
}
