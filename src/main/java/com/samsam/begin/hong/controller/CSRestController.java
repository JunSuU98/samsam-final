package com.samsam.begin.hong.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.samsam.begin.hong.dto.CSDTO;
import com.samsam.begin.hong.entity.CI;
import com.samsam.begin.hong.service.CSService;

import io.micrometer.common.util.StringUtils;

@RestController
@RequestMapping("/api/cs")
public class CSRestController {

	private final CSService csService;

	public CSRestController(CSService csService) {
		this.csService = csService;
	}

	@GetMapping("/select")
	public ResponseEntity<?> list(@PageableDefault(page = 0, size = 5, sort = "csNumber", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam(name = "page", defaultValue = "1") int page, @RequestParam(name = "searchContent", required = false) String searchContent, @RequestParam(name = "searchKeyword", required = false) String searchKeyword) {

		Pageable adjustedPageable = PageRequest.of(page - 1, pageable.getPageSize(), pageable.getSort());

		Page<CI> list;

		if (StringUtils.isEmpty(searchKeyword) || StringUtils.isEmpty(searchContent)) {
			list = csService.findAllCis(adjustedPageable);
		} else if ("title".equals(searchContent)) {
			list = csService.CISearchList(searchKeyword, adjustedPageable);
		} else if ("content".equals(searchContent)) {
			list = csService.CISearchContent(searchKeyword, adjustedPageable);
		} else {
			list = csService.findAllCis(adjustedPageable);
		}

		return ResponseEntity.ok(list);
	}

	@GetMapping("/select/{cs_number}")
	public ResponseEntity<?> detail(@PathVariable("cs_number") Integer cs_number) {
		CI ci = csService.findCIById(cs_number);
		if (ci == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(ci);
	}

	@PostMapping("/insert")
	public ResponseEntity<?> insert(@RequestBody CSDTO csDTO) {
		CI ci = new CI();
		ci.setCsNumber(csDTO.getCsNumber());
		ci.setCsTitle(csDTO.getCsTitle());
		ci.setCsDate(csDTO.getCsDate());
		ci.setCsContent(csDTO.getCsContent());
		ci.setMemberId(csDTO.getMemberId());
		csService.saveCI(ci);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PutMapping("/update/{cs_number}")
	public ResponseEntity<?> update(@PathVariable("cs_number") Integer cs_number, @RequestBody CSDTO csDTO) {
		CI existingCI = csService.findCIById(cs_number);
		if (existingCI == null) {
			return ResponseEntity.notFound().build();
		}
		existingCI.setCsTitle(csDTO.getCsTitle());
		existingCI.setCsDate(csDTO.getCsDate());
		existingCI.setCsContent(csDTO.getCsContent());
		csService.saveCI(existingCI);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/delete/{cs_number}")
	public ResponseEntity<?> delete(@PathVariable("cs_number") Integer cs_number) {
		csService.deleteCIById(cs_number);
		return ResponseEntity.ok().build();
	}
}