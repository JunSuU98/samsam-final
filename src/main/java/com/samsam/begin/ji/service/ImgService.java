package com.samsam.begin.ji.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.inject.Inject;
import org.springframework.transaction.annotation.Transactional;

import com.samsam.begin.ji.entity.Img;
import com.samsam.begin.ji.repository.ImgRepository;

@Service
public class ImgService {
	@Inject
	private ImgRepository imgRepository;
	
	public ImgService(ImgRepository imgRepository) {
        this.imgRepository = imgRepository;
    }

    // 모든 이미지 목록을 내림차순으로 정렬하여 페이징 처리
	@Transactional(readOnly = true)
    public Page<Img> findAllImgsDescending(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return imgRepository.findAll(pageable);
    }
	
	// 이미지 저장
	@Transactional
	public Img saveImg(Img img) {
		return imgRepository.save(img);
	}
	
	// 상품, 공지와 관련된 이미지 전체 조회
	@Transactional(readOnly = true)
	public List<Img> findAllImgs(Integer product_number, Integer info_number) {
		if(product_number != null) { // 상품 번호가 있다면 상품 번호와 일치하는 이미지 반환
			return imgRepository.findByProductNumber(product_number);
		} else if(info_number != null){ // 공지 번호가 있다면 공지 번호와 일치하는 이미지 반환
			return imgRepository.findByProductNumber(info_number);
		} else {
			return null;
		}
	}
	
	// 이미지 삭제 
	@Transactional
	public void deleteImgs(Integer product_number, Integer info_number) throws IOException {
		if(product_number != null) { // 상품 번호가 있다면 상품 번호와 일치하는 이미지 반환
			
			// 시스템 폴더에 저장된 사진 파일 삭제
			List<Img> imgArr = imgRepository.findByProductNumber(product_number);
			
			for(Img img : imgArr) {
				Path imgPath = Paths.get("/Users/haru/SamsamImg/" + img.getImgUrl());
				Files.deleteIfExists(imgPath);
			}

			// DB 에 저장된 데이터 삭제
			imgRepository.deleteByProductNumber(product_number);
		} else if(info_number != null){ // 공지 번호가 있다면 공지 번호와 일치하는 이미지 반환
			
			// 시스템 폴더에 저장된 사진 파일 삭제
			List<Img> imgArr = imgRepository.findByInfoNumber(info_number);
			
			for(Img img : imgArr) {
				Path imgPath = Paths.get("/Users/haru/SamsamImg/" + img.getImgUrl());
				Files.deleteIfExists(imgPath);
			}

			// DB 에 저장된 데이터 삭제
			imgRepository.deleteByInfoNumber(info_number);
		}	
	}
	
	
	// 페이징 이미지 전체조회
	@Transactional(readOnly = true)
	public Page<Img> findAllImgs(int page, int size){
		Pageable pageable = PageRequest.of(page, size);
		
		return imgRepository.findAll(pageable);
	}
	
}

