package com.samsam.begin.wook.controller;

import org.springframework.web.bind.annotation.RestController;

import com.samsam.begin.wook.controller.*;
import com.samsam.begin.wook.dto.CommentDTO;
import com.samsam.begin.wook.entity.*;
import com.samsam.begin.wook.service.*;

import jakarta.servlet.http.HttpSession;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Sort;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@ResponseBody
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/api/comments")
    public ResponseEntity<Map<String, Object>> getComments(@RequestParam("infoNumber") Integer infoNumber,
            @PageableDefault(page = 0, size = 5, sort = "commentDate" , direction = Sort.Direction.DESC) Pageable pageable, HttpSession httpSession) {

        String userId = (String) httpSession.getAttribute("member_id");
        Page<CommentDTO> commentPage = commentService.getComment(infoNumber, userId, pageable);

        int nowPage = commentPage.getNumber() + 1;
        int totalPages = commentPage.getTotalPages();

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
        response.put("comments", commentPage.getContent());
        response.put("nowPage", nowPage);
        response.put("startPage", startPage);
        response.put("endPage", endPage);
        response.put("totalPages", totalPages);
        response.put("infoNumber", infoNumber);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/api/comments")
    public ResponseEntity<?> postComment(@RequestBody Map<String, String> requestMap, HttpSession httpSession) {
    	
    	 String content = requestMap.get("content");
    	 String infoNumberStr = requestMap.get("infoNumber");
    	 Integer infoNumber = Integer.parseInt(infoNumberStr);
        String userId = (String) httpSession.getAttribute("member_id");

        if (userId == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        INFOCOMMENT savedComment = commentService.save(content, infoNumber, userId);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @PutMapping("/api/comments/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable("commentId") Integer commentId,
            @RequestParam("content") String content, HttpSession httpSession) {
        String userId = (String) httpSession.getAttribute("member_id");

        if (userId == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        try {
            INFOCOMMENT updatedComment = commentService.updateComment(userId, commentId, content);
            return new ResponseEntity<>(updatedComment, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("/api/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable("commentId") Integer commentId, HttpSession httpSession) {
        String userId = (String) httpSession.getAttribute("member_id");

        if (userId == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        try {
            commentService.deleteComment(userId, commentId);
            return new ResponseEntity<>("댓글이 삭제되었습니다.", HttpStatus.OK);
            
        } catch (IllegalArgumentException e) {
            if (e.getMessage().equals("권한이 없습니다.")) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
            } else if (e.getMessage().equals("댓글을 찾을 수 없습니다.")) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    
    
    
    
  
   
}
