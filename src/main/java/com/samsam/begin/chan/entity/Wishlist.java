package com.samsam.begin.chan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Entity
@Data
public class Wishlist {
    @Id
	@SequenceGenerator(name = "wishlist_seq_gen", sequenceName = "wishlist_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "wishlist_seq_gen")
    @Column(name = "wishlist_number")
    private Integer wishlistNumber;
    
    @Column(name = "member_id")
    private String memberId;
    
    @Column(name = "product_number")
    private Integer productNumber; 
}

