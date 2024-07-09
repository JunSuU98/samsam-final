package com.samsam.begin.wook.controller;

import java.lang.ProcessHandle.Info;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.samsam.begin.wook.dto.InfoDTO;
import com.samsam.begin.wook.entity.INFO;
import com.samsam.begin.wook.service.InfoBoardService;

import lombok.extern.log4j.Log4j2;

@RestController
public class InfoBoardController {

    @Autowired
    private InfoBoardService infoBoardService;

    @GetMapping("/api/list")
    public ResponseEntity<Map<String, Object>> list(
            @PageableDefault(page = 0, size = 5, sort = "infoNumber" ,direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(name = "searchkeyword", required = false) String searchkeyword) {

        Page<INFO> list;

        if (searchkeyword == null || searchkeyword.isEmpty()) {
            list = infoBoardService.list(pageable);
        } else {
            list = infoBoardService.search(searchkeyword, pageable);
        }

        int nowPage = list.getNumber() + 1;
        int totalPages = list.getTotalPages();

        int startPage = Math.max(1, nowPage - 2);
        int endPage = Math.min(totalPages, nowPage + 2);

        if (endPage - startPage + 1 < 5) {
            if (startPage == 1) {
                endPage = Math.min(totalPages, startPage + 4);
            } else if (endPage == totalPages) {
                startPage = Math.max(1, endPage - 4);
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("list", list);
        response.put("nowPage", nowPage);
        response.put("startPage", startPage);
        response.put("endPage", endPage);
        response.put("totalPages", totalPages);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/api/select/{infoNumber}")
    public INFO select(@PathVariable("infoNumber") Integer infoNumber) {
        return infoBoardService.select(infoNumber);
    }

    @PostMapping("/api/insert")
    public INFO insert(@RequestBody InfoDTO infoDTO) {
        INFO info = infoBoardService.convertDtoToEntity(infoDTO);
        System.out.println(infoDTO.toString());
        return infoBoardService.save(info);
    }

    @PutMapping("/api/update")
    public INFO update(@RequestBody InfoDTO infoDTO) {
        INFO info = infoBoardService.convertDtoToEntity(infoDTO);
        return infoBoardService.save(info);
    }

    @DeleteMapping("/api/delete/{infoNumber}")
    public void delete(@PathVariable("infoNumber") Integer infoNumber) {
        infoBoardService.delete(infoNumber);
    }
    
    @GetMapping("/test-get-list")
    public List<INFO> getlist() {
    	 return infoBoardService.getListTest();
    }
}
