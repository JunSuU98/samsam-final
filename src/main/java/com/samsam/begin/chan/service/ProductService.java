package com.samsam.begin.chan.service;

import com.samsam.begin.chan.entity.Product;
import com.samsam.begin.chan.repository.ProductRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // 페이징 검색 전체 조회
    public Page<Product> findAllProduct(String searchFilter, String searchQuery, int page, int size){
    	Pageable pageable = PageRequest.of(page, size);
    	
    	if(searchFilter != null && searchQuery != null) {
    		
			if(searchFilter.equals("product_title")) {
				return productRepository.findByProductTitleContaining(searchQuery, pageable);
			}
			
			if(searchFilter.equals("product_content")) {
				return productRepository.findByProductContentContaining(searchQuery, pageable);
			}	
    	}
    
    	return productRepository.findAll(pageable);
    }
    
    // 회원 아이디로 상품 전체 조회 
    public Page<Product> searchProductByMemberId(String member_id, int page, int size) {
    	Pageable pageable = PageRequest.of(page, size);

    	return productRepository.findByMemberId(member_id, pageable);
    }
    
    // 회원 아이디로 상품 전체 조회 (리스트)
    public List<Product> searchProductByMemberId(String member_id) {

    	return productRepository.findByMemberId(member_id);
    }
    
    
    public Page<Product> searchProductsByName(String name, Pageable pageable) {
        return productRepository.findByProductTitleContaining(name, pageable);
    }

    // 카테고리로 상품 전체 조회 페이징 
    public Page<Product> searchProductsByCategory(String category, int page, int size) {
    	Pageable pageable = PageRequest.of(page, size);

        return productRepository.findByProductCategory(category, pageable);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }
}
