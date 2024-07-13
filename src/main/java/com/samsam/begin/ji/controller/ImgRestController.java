package com.samsam.begin.ji.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.samsam.begin.ji.dto.ImgDTO;
import com.samsam.begin.ji.entity.Img;
import com.samsam.begin.ji.service.ImgService;

import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;

// RESTful 웹 서비스를 정의하는 컨트롤러로 구성함
@RestController

@RequiredArgsConstructor
public class ImgRestController {
	private static final Logger logger = LogManager.getLogger(ImgRestController.class);
	
	@Inject
	private final ImgService imgService;
	
	// 상품, 공지사항과 관련된 이미지 리스트 조회
	@GetMapping("/api/img/select")
	public List<Img> getImgs(@RequestParam(name = "product_number", required = false) Integer product_number 
			, @RequestParam(name = "info_number", required = false) Integer info_number) {
		
		return imgService.findAllImgs(product_number, info_number);
	}
	
	
	@GetMapping("/img/{img_url}")
	public ResponseEntity<byte[]> viewImg(@PathVariable("img_url") String img_url) throws IOException {
		
		String dir = "/Users/haru/SamsamImg/";
		File imgFile = new File(dir+img_url);
		Path imgPath = Paths.get(imgFile.getAbsolutePath());
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);

		return new ResponseEntity<>(Files.readAllBytes(imgPath), headers, HttpStatus.OK);
	}

	

	// 새로운 이미지 추가 
	@PostMapping("/api/img/insert")
	public ResponseEntity<String> insertImg(@RequestParam(value = "images") List<MultipartFile> imgFiles
			, @RequestParam(name = "productNumber", required = false) Integer productNumber
			, @RequestParam(name = "infoNumber", required = false) Integer infoNumber
			) throws IllegalStateException, IOException {
		
        String imgPath = "/Users/haru/SamsamImg/";

		
		// 이미지 배열을 하나씩 돌면서 Img 엔티티를 하나씩 저장한다
        for(MultipartFile imgfile: imgFiles) {
        	if (!imgFiles.isEmpty()) {
        		
        		// DB 에 Img 엔티티로 저장
        		Img img = new Img();
                String fileName = UUID.randomUUID().toString() + "_" + imgfile.getOriginalFilename(); // UUID 부착 파일명 생성
                
                img.setImgUrl(fileName);
                img.setProductNumber(productNumber);
                img.setInfoNumber(infoNumber);
                
                imgService.saveImg(img);
                
                // 지정한 경로에 실제로 이미지를 다운로드한다
                imgfile.transferTo(new File(imgPath + fileName)); // 실제 파일 저장 경로 설정
            }
        	
        }
		
		return new ResponseEntity< >("이미지가 성공적으로 저장되었습니다.", HttpStatus.CREATED);
	}
	
	// 이미지 수정 
	@PostMapping("/api/img/update")
	public ResponseEntity<String> updateImg(@RequestParam(value = "images") List<MultipartFile> imgFiles
			, @RequestParam(name = "productNumber", required = false) Integer productNumber
			, @RequestParam(name = "infoNumber", required = false) Integer infoNumber
			) throws IllegalStateException, IOException {
		
	    String imgPath = "/Users/haru/SamsamImg/";
	    
	    // 1. 기존의 이미지들을 모두 삭제한다
	    imgService.deleteImgs(productNumber, infoNumber);
		
		// 2. 이미지 배열을 하나씩 돌면서 Img 엔티티를 하나씩 저장한다
        for(MultipartFile imgfile: imgFiles) {
        	if (!imgFiles.isEmpty()) {
        		
        		// DB 에 Img 엔티티로 저장
        		Img img = new Img();
                String fileName = imgfile.getOriginalFilename(); 
                
                img.setImgUrl(fileName);
                img.setProductNumber(productNumber);
                img.setInfoNumber(infoNumber);
                
                imgService.saveImg(img);
                
                // 지정한 경로에 실제로 이미지를 다운로드한다
                imgfile.transferTo(new File(imgPath + fileName)); // 실제 파일 저장 경로 설정
            }
        	
        }
		
		return new ResponseEntity< >("이미지가 성공적으로 저장되었습니다.", HttpStatus.CREATED);


	}
	
	
	// 이미지 삭제
	@DeleteMapping("/api/img/delete")
	public ResponseEntity<String> deleteImg(@RequestParam(name = "product_number", required = false) Integer productNumber, @RequestParam(name = "info_number", required = false) Integer infoNumber) throws IOException{
		
		imgService.deleteImgs(productNumber, infoNumber);
		
		return new ResponseEntity<>("이미지 삭제 성공", HttpStatus.NO_CONTENT);
	}
	
}
