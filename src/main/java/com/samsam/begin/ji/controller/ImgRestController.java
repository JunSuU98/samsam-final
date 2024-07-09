package com.samsam.begin.ji.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
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
	
	// 모든 이미지 목록 조회
	@GetMapping("/imgselect")
	public List<Img> getImgs() {

		return imgService.findAllImgs();
	}

// 재홍이 코드
//	@GetMapping("/imgselect")
//	public ResponseEntity<?> list(@PageableDefault(page = 0, size = 5, sort = "imgNumber", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam(name = "page", defaultValue = "1") int page) {
//	    return ResponseEntity.ok(list(pageable, page));
//	}
	
//	@GetMapping("/select")
//	   public ResponseEntity<?> list(@PageableDefault(page = 0, size = 5, sort = "csNumber", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam(name = "page", defaultValue = "1") int page, @RequestParam(name = "searchContent", required = false) String searchContent, @RequestParam(name = "searchKeyword", required = false) String searchKeyword) {
//
//	      Pageable adjustedPageable = PageRequest.of(page - 1, pageable.getPageSize(), pageable.getSort());
//
//	      Page<CI> list;
//
//	      if (StringUtils.isEmpty(searchKeyword) || StringUtils.isEmpty(searchContent)) {
//	         list = csService.findAllCis(adjustedPageable);
//	      } else if ("title".equals(searchContent)) {
//	         list = csService.CISearchList(searchKeyword, adjustedPageable);
//	      } else if ("content".equals(searchContent)) {
//	         list = csService.CISearchContent(searchKeyword, adjustedPageable);
//	      } else {
//	         list = csService.findAllCis(adjustedPageable);
//	      }
//
//	      return ResponseEntity.ok(list);
//	   }
	
	// 특정 이미지의 상세 정보 조회
	@GetMapping("/imgselectdetail/{img_number}")
	public ResponseEntity<Img> getImgById(@PathVariable("img_number") Integer img_number) {
		Img img = imgService.findImgById(img_number);
		logger.info("img", img);
		if (img != null) {
			return new ResponseEntity< >(img, HttpStatus.OK);
		} else {
			return new ResponseEntity< >(HttpStatus.NOT_FOUND);
		}
	}
	
	// 새로운 이미지를 추가하는 POST 요청 처리
	@PostMapping("/img/insert")
	public ResponseEntity<String> insertImg(@RequestParam(value = "images") List<MultipartFile> imgFiles
			, @RequestParam(name = "productNumber", required = false) int productNumber
			, @RequestParam(name = "infoNumber", required = false) int infoNumber
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
	
	// 기존 이미지 정보를 수정함
//	@PutMapping("/imgupdate/{img_number}")
//	public ResponseEntity<Img> updateImg(@PathVariable("img_number") Integer img_number, @RequestBody Img imgDetails) {
//		Img img = imgService.findImgById(img_number);
//		if (img != null) {
//			img.setImgUpload(imgDetails.getImgUpload());
//			img.setImgUpdate(imgDetails.getImgUpdate());
//			img.setImgUrl(imgDetails.getImgUrl());
//			
//			Img img2 = imgService.saveImg(img);
//			
//			return new ResponseEntity< >(img2, HttpStatus.OK);
//		} else {
//			return new ResponseEntity< >(HttpStatus.NOT_FOUND);
//		}
//	}
	
	@PutMapping("/imgupdate")
	public ResponseEntity<Img> updateImg(@RequestBody Img imgDetails) {
	    Img img = imgService.findImgById(imgDetails.getImgNumber());
	    if (img != null) {
	        img.setImgUrl(imgDetails.getImgUrl());
	        
	        Img updatedImg = imgService.saveImg(img);
	        
	        return new ResponseEntity<>(updatedImg, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	// 특정 이미지 정보를 삭제함
	@DeleteMapping("/imgdelete/{img_number}")
	public ResponseEntity<HttpStatus> deleteImg(@PathVariable("img_number") Integer img_number) {
		imgService.deleteImgById(img_number);
		
		return new ResponseEntity< >(HttpStatus.NO_CONTENT);
	}
}
