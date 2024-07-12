package com.samsam.begin.chan.service;

import com.samsam.begin.chan.entity.Wishlist;
import com.samsam.begin.chan.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    @Transactional
    public Wishlist addToWishlist(String member_id, int product_number) {
        Wishlist wishlist = new Wishlist();
        wishlist.setMemberId(member_id);
        wishlist.setProductNumber(product_number);
        wishlist.setWishlistCreate(LocalDate.now().toString());
        return wishlistRepository.save(wishlist);
    }

    @Transactional(readOnly = true)
    public List<Wishlist> getWishlistByUserId(String member_id) {
        return wishlistRepository.findByMemberId(member_id);
    }
    
    @Transactional
    public void deleteWishlistItem(String memberId, int productNumber) {
    	wishlistRepository.deleteByMemberIdAndProductNumber(memberId, productNumber);
    }
    
    @Transactional
    public void deleteAllwishlist(String member_id) {
    	wishlistRepository.deleteByMemberId(member_id);
    }
}

