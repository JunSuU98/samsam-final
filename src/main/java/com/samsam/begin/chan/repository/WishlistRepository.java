package com.samsam.begin.chan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.samsam.begin.chan.entity.Wishlist;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    List<Wishlist> findByMemberId(String member_id);
}
