package com.samsam.begin.chan.controller;

import com.samsam.begin.chan.dto.WishlistDTO;
import com.samsam.begin.chan.entity.Wishlist;
import com.samsam.begin.chan.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    // 찜 추가 
    @PostMapping("/add")
    public ResponseEntity<Wishlist> addToWishlist(@RequestBody WishlistDTO wishlistDTO) {
        Wishlist wishlist = wishlistService.addToWishlist(wishlistDTO.getMember_id(), wishlistDTO.getProduct_number());
        return new ResponseEntity<>(wishlist, HttpStatus.CREATED);
    }

    // 찜목록 전체 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Wishlist>> getWishlistByUserId(@PathVariable("userId") String member_id) {
        List<Wishlist> wishlist = wishlistService.getWishlistByUserId(member_id);
        return new ResponseEntity<>(wishlist, HttpStatus.OK);
    }
    
    
    // 찜목록 삭제
    @DeleteMapping("/{productNumber}/{memberId}")
    public void deleteWishlistItem(@PathVariable("productNumber") int productNumber,
    		@PathVariable("memberId") String memberId) {
    	wishlistService.deleteWishlistItem(memberId, productNumber);
    }
    
    // 찜목록 전체 삭제
    @DeleteMapping("/user/{userId}")
    public void deleteAllWishlist(@PathVariable("userId") String member_id) {
    	wishlistService.deleteAllwishlist(member_id);
    }
}
