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

    @PostMapping("/add")
    public ResponseEntity<Wishlist> addToWishlist(@RequestBody WishlistDTO wishlistDTO) {
        Wishlist wishlist = wishlistService.addToWishlist(wishlistDTO.getMember_id(), wishlistDTO.getProduct_number());
        return new ResponseEntity<>(wishlist, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Wishlist>> getWishlistByUserId(@PathVariable String member_id) {
        List<Wishlist> wishlist = wishlistService.getWishlistByUserId(member_id);
        return new ResponseEntity<>(wishlist, HttpStatus.OK);
    }
}
