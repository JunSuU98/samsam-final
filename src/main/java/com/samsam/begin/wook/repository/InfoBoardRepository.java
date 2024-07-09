package com.samsam.begin.wook.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.samsam.begin.wook.entity.INFO;
import com.samsam.begin.wook.repository.*;


@Repository
public interface InfoBoardRepository extends JpaRepository<INFO, Integer> {
	 //흠 보여지는건데 굳이 서버쪽에서 해야할 필요가 있나? 그냥 프론트 쪽에서 날짜 순으로 나오게 하겠음
	Page<INFO> findAllByOrderByInfoNumberDesc(String searchkeyword, Pageable pageable);

    Page<INFO> findByinfoTitleContaining(String searchkeyword, Pageable pageable);
	
}
