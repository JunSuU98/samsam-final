package com.samsam.begin.hong.service;

//import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.samsam.begin.hong.entity.CI;
import com.samsam.begin.hong.repository.CSRepository;

import jakarta.inject.Inject;

@Service
public class CSService {
	@Inject
	private CSRepository csRepository;

	@Transactional
	public CI saveCI(CI ci) {
		return csRepository.save(ci);
	}

	@Transactional(readOnly = true)
	public Page<CI> findAllCis(Pageable pageable) {
		return csRepository.findAll(pageable);
	}

	@Transactional(readOnly = true)
	public CI findCIById(Integer cs_number) {
		return csRepository.findById(cs_number).orElse(null);
	}

	@Transactional
	public void deleteCIById(Integer cs_number) {
		csRepository.deleteById(cs_number);
	}

	public boolean existsByCSnumber(Integer cs_number) {
		return csRepository.existsById(cs_number);
	}

	@Transactional(readOnly = true)
	public Page<CI> CISearchList(String searchKeyword, Pageable pageable) {
		return csRepository.findByCsTitleContaining(searchKeyword, pageable);
	}

	@Transactional(readOnly = true)
	public Page<CI> CISearchContent(String searchContent, Pageable pageable) {
		return csRepository.findByCsContentContaining(searchContent, pageable);
	}
}