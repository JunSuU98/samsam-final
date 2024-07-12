package com.samsam.begin.wook.chat.repository;


import com.samsam.begin.wook.chat.entity.*;	
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface ChatRoomRepository extends JpaRepository<CHATROOM, Long> {
	
	 Optional<CHATROOM> findBySellerIdAndBuyerId(String sellerId, String buyerId);
	 
	 List<CHATROOM> findBySellerIdOrBuyerId(String sellerId, String buyerId);
}
