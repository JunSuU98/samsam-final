package com.samsam.begin.chan.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.samsam.begin.chan.entity.Product;
import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Integer> {

    Page<Product> findByProductTitleContaining(String product_title, Pageable pageable);

    Page<Product> findByProductContentContaining(String product_content, Pageable pageable);
    
    Page<Product> findByProductCategory(String product_category, Pageable pageable);
    
    // 회원 상품 조회
    Page<Product> findByMemberId(String memberId, Pageable pageable);

    // 회원 상품 조회 (리스트)
    List<Product> findByMemberId(String memberId);
}
