package com.samsam.begin.chan.service;

import com.samsam.begin.chan.entity.Wishlist;
import com.samsam.begin.chan.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public Wishlist addToWishlist(String member_id, int product_number) {
        Wishlist wishlist = new Wishlist();
        wishlist.setMemberId(member_id);
        wishlist.setProductNumber(product_number);
        return wishlistRepository.save(wishlist);
    }

    public List<Wishlist> getWishlistByUserId(String member_id) {
        return wishlistRepository.findByMemberId(member_id);
    }
}
