package com.samsam.begin.wook.chat.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.samsam.begin.wook.chat.entity.*;

@Repository
public interface MessageRepository extends JpaRepository<MESSAGE, Long> {
	
	 List<MESSAGE> findByChatRoomRoomId(Long roomId);
	 List<MESSAGE> findByChatRoomRoomIdOrderByTimestampAsc(Long roomId);
	 
	 
	 List<MESSAGE> findByChatRoomRoomIdAndWriterNot(Long roomId, String writer);
	 int countByChatRoomRoomIdAndWriterNotAndReadFalse(Long roomId, String writer);
	 

}
