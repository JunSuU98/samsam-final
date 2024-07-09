package com.samsam.begin.chan.controller;

import com.samsam.begin.chan.dto.ProductDTO;
import com.samsam.begin.chan.entity.Product;
import com.samsam.begin.chan.service.ProductService;
import com.samsam.begin.ji.service.ImgService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    
    @Autowired
    private ImgService imgService;

    // 상품 등록
    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
    	
    	// 엔티티 객체에 dto 의 정보 저장
        Product product = new Product();

        product.setProductUpload(LocalDate.now().toString());
        product.setProductUpdate(LocalDate.now().toString());
        product.setProductTitle(productDTO.getProduct_title());
        product.setProductContent(productDTO.getProduct_content());
        product.setProductPrice(productDTO.getProduct_price());
        product.setProductStatus("판매중");
        product.setProductCategory(productDTO.getProduct_category());        
        product.setMemberId(productDTO.getMember_id());
        
        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
    }
    
    // 상품 수정 
    @PutMapping("/{product_number}")
    public ResponseEntity<Product> updateProduct(@RequestBody ProductDTO productDTO) {
    	
    	Product exsistingProduct = productService.getProductById(productDTO.getProduct_number());
    	exsistingProduct.setProductUpdate(LocalDate.now().toString());
    	exsistingProduct.setProductTitle(productDTO.getProduct_title());
    	exsistingProduct.setProductContent(productDTO.getProduct_content());    	
    	exsistingProduct.setProductPrice(productDTO.getProduct_price());
        exsistingProduct.setProductStatus(productDTO.getProduct_status());
        exsistingProduct.setProductCategory(productDTO.getProduct_category());        

        
        return new ResponseEntity<>(productService.saveProduct(exsistingProduct), HttpStatus.CREATED);
    }

    // 검색 페이징 전체 조회
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getAllProduct(
    		@RequestParam(name = "searchFilter", required = false) String searchFilter
			, @RequestParam(name = "searchQuery", required = false) String searchQuery
			, @RequestParam(name = "page", defaultValue = "1") int page
			, @RequestParam(name = "size", defaultValue = "10") int size){
    	
    	Page<Product> productPage = productService.findAllProduct(searchFilter, searchQuery, page - 1, size);
    	
    	if(productPage != null) {
    		
    		List<Product> productList = productPage.getContent();
    		int totalPage = productPage.getTotalPages();    		

    		Map<String, Object> responseMap = new HashMap<>();
			responseMap.put("productList", productList);
			responseMap.put("totalPage", totalPage);
			responseMap.put("currentPage", page);
		
			return new ResponseEntity<>(responseMap, HttpStatus.OK);
    	} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
				
    }
    
    // 상품 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    // 상품 카테고리 검색 
    @GetMapping("/category")
    public ResponseEntity<Page<Product>> searchProductsByCategory(@RequestParam("category") String category, Pageable pageable) {
        Page<Product> products = productService.searchProductsByCategory(category, pageable);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // 상품 삭제 
    @DeleteMapping("/{productNumber}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("productNumber") Integer productNumber) throws IOException {
        // 1. 실제 이미지 파일을 삭제한다
        imgService.deleteImgs(productNumber, null);
        
        // 2. 상품 db 에서 삭제 작업을 수행한다
        productService.deleteProduct(productNumber);
        
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
//	@GetMapping("/search")
//    public ResponseEntity<Page<Product>> searchProductsByName(@RequestParam("name") String name, Pageable pageable) {
//        Page<Product> products = productService.searchProductsByName(name, pageable);
//        return new ResponseEntity<>(products, HttpStatus.OK);
//    }
}
