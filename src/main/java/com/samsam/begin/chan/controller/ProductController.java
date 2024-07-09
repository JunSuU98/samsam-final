package com.samsam.begin.chan.controller;

import com.samsam.begin.chan.dto.ProductDTO;
import com.samsam.begin.chan.entity.Product;
import com.samsam.begin.chan.service.ProductService;
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

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
    	
    	// 엔티티 객체에 dto 의 정보 저장
        Product product = new Product();

        product.setProductUpload(LocalDate.now().toString());
        product.setProductUpdate(LocalDate.now().toString());
        product.setProductTitle(productDTO.getProduct_title());
        product.setProductContent(productDTO.getProduct_content());
        product.setProductPrice(productDTO.getProduct_price());
        product.setProductStatus("selling");
        product.setProductCategory(productDTO.getProduct_category());        
        product.setMemberId(productDTO.getMember_id());
        
        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(Pageable pageable) {
        Page<Product> products = productService.getAllProducts(pageable);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Product>> searchProductsByName(@RequestParam("name") String name, Pageable pageable) {
        Page<Product> products = productService.searchProductsByName(name, pageable);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<Page<Product>> searchProductsByCategory(@RequestParam("category") String category, Pageable pageable) {
        Page<Product> products = productService.searchProductsByCategory(category, pageable);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
