package com.samsam.begin.chan.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.samsam.begin.chan.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Page<Product> findByProductTitleContaining(String product_title, Pageable pageable);

    Page<Product> findByProductContentContaining(String product_content, Pageable pageable);
    
    Page<Product> findByProductCategory(String product_category, Pageable pageable);
    
}
