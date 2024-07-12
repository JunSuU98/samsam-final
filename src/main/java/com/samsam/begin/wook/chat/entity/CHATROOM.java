// ChatRoom.java
package com.samsam.begin.wook.chat.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class CHATROOM {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chatroom_seq_gen")
    @SequenceGenerator(name = "chatroom_seq_gen", sequenceName = "chatroom_seq", allocationSize = 1)
    @Column(name = "ROOM_ID")
    private Long roomId;

    @Column(name = "SELLER_ID")
    private String sellerId;

    @Column(name = "BUYER_ID")
    private String buyerId;

    @Column(name = "ROOM_TITLE")
    private String roomTitle;

    @Column(name = "CREATEDAT")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<MESSAGE> messages;

    public CHATROOM() {}

    public CHATROOM(String sellerId, String buyerId, String roomTitle) {
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.roomTitle = roomTitle;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
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

    public String getRoomTitle() {
        return roomTitle;
    }

    public void setRoomTitle(String roomTitle) {
        this.roomTitle = roomTitle;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
