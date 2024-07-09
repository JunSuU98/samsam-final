package com.samsam.begin.chan.service;

import com.samsam.begin.chan.entity.Product;
import com.samsam.begin.chan.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

//    public Page<Product> getAllProducts(Pageable pageable) {
//        return productRepository.findAll(pageable);
//    }
    
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
    
    
    

    public Page<Product> searchProductsByName(String name, Pageable pageable) {
        return productRepository.findByProductTitleContaining(name, pageable);
    }

    public Page<Product> searchProductsByCategory(String category, Pageable pageable) {
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
