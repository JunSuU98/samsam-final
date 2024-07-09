package com.samsam.begin.wook.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.samsam.begin.wook.dto.*;
import com.samsam.begin.wook.entity.*;
import com.samsam.begin.wook.repository.*;

@Service
public class InfoBoardService {

	@Autowired
	private InfoBoardRepository infoboardRepository;

	public Page<INFO> list(Pageable pageable ) {

		return infoboardRepository.findAll(pageable);
	}

	public INFO select(Integer infoNumber) {

		return infoboardRepository.findById(infoNumber).orElse(null);

	}
    
	public INFO save(INFO info) {

		return infoboardRepository.save(info);
	}

	public void delete(Integer infoNumber) {

		infoboardRepository.deleteById(infoNumber);
	}
	
	
	public Page<INFO> search(String searchkeyword , Pageable pageable){
		
		return infoboardRepository.findByinfoTitleContaining(searchkeyword,pageable);
	}
	
	
	
	
	

	// DTO-> Entity
	public INFO convertDtoToEntity(InfoDTO infodto) {

		INFO info = new INFO();
	    info.setInfoNumber(infodto.getInfoNumber());
		info.setInfoTitle(infodto.getInfoTitle());
		info.setInfoDate(infodto.getInfoDate());
		info.setInfoContent(infodto.getInfoContent());

		return info;
	}
    
	// Entity -> DTO
	public InfoDTO convertEntityToDTO(INFO info) {

		InfoDTO infoDTO = new InfoDTO();
		infoDTO.setInfoNumber(info.getInfoNumber());
		infoDTO.setInfoTitle(info.getInfoTitle());
		infoDTO.setInfoContent(info.getInfoContent());
		infoDTO.setInfoDate(info.getInfoDate());

		return infoDTO;
	}
	
	//리액트 연습 코드
	public List<INFO> getListTest(){
		
		return infoboardRepository.findAll();
	}

}
