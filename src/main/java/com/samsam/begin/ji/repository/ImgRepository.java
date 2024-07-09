package com.samsam.begin.ji.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.samsam.begin.ji.entity.Img;

public interface ImgRepository extends JpaRepository<Img, Integer>{
	
	List<Img> findByProductNumber(Integer product_number);
	
	List<Img> findByInfoNumber(Integer info_number);
	
	void deleteByProductNumber(Integer product_number);
	
	void deleteByInfoNumber(Integer info_number);

}
