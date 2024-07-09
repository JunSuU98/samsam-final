package com.samsam.begin.wook.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.samsam.begin.wook.dto.*;
import com.samsam.begin.wook.entity.*;
import com.samsam.begin.wook.repository.*;
import com.samsam.begin.wook.service.*;

import jakarta.transaction.Transactional;

@Service
public class CommentService {
	
	 @Autowired
	    private CommentRepository commentRepository;
	
	    @Autowired
	    private InfoBoardService infoboardService;
	
		    // 댓글 저장 서비스
	    public INFOCOMMENT save(String content, Integer infoNumber, String userId) {
	        INFOCOMMENT data = new INFOCOMMENT();
	        data.setUserId(userId);
	        data.setContent(content);
	        INFO parentInfo = infoboardService.select(infoNumber);
	        data.setParentID(parentInfo);
	        data.setCommentDate(new Date()); // 현재 시간 설정
	        return commentRepository.save(data);
	    }
	
//	    // 댓글 불러오기 서비스 //페이징  전 코드
//	    public List<CommentDTO> getComment(@RequestParam("infoNumber") Integer infoNumber, String userId) {
//	        INFO info = infoboardService.select(infoNumber);
//	        List<INFOCOMMENT> comments = commentRepository.findAllByParentID(info);
//	
//	        List<CommentDTO> commentDTOs = new ArrayList<>();
//	
//	        for (INFOCOMMENT comment : comments) {
//	            CommentDTO commentDTO = new CommentDTO();
//	            commentDTO.setCommentId(comment.getCommentId());
//	            commentDTO.setUserId(comment.getUserId());
//	            commentDTO.setContent(comment.getContent());
//	            commentDTO.setCommentDate(comment.getCommentDate());
//	            commentDTO.setChackAuthority(comment.getUserId().equals(userId)); // 삭제 가능 여부 설정
//	            commentDTOs.add(commentDTO);
//	        }
//	
//	        return commentDTOs;
//	    }
	    
	    // 댓글 불러오기 서비스 //페이징  전 코드
	    public Page<CommentDTO> getComment(@RequestParam("infoNumber") Integer infoNumber, String userId, Pageable pageable) {
	        INFO info = infoboardService.select(infoNumber);
	        Page<INFOCOMMENT> commentPage = commentRepository.findAllByParentID(info ,pageable);
	
	        List<CommentDTO> commentDTOs = new ArrayList<>();
	
	        for (INFOCOMMENT comment : commentPage) {
	            CommentDTO commentDTO = new CommentDTO();
	            commentDTO.setCommentId(comment.getCommentId());
	            commentDTO.setUserId(comment.getUserId());
	            commentDTO.setContent(comment.getContent());
	            commentDTO.setCommentDate(comment.getCommentDate());
	            commentDTO.setChackAuthority(comment.getUserId().equals(userId)); // 삭제 가능 여부 설정
	            commentDTOs.add(commentDTO);
	        }
	
	        return new PageImpl<>(commentDTOs, pageable, commentPage.getTotalElements());
	    }
	
	    @Transactional
	    public void deleteComment(String userId, Integer commentId) {
	        INFOCOMMENT infocomment = commentRepository.findById(commentId).orElse(null);
	        if (infocomment != null) {
	            System.out.println("댓글 작성자: " + infocomment.getUserId());
	            System.out.println("현재 사용자: " + userId);
	            if (infocomment.getUserId().equals(userId)) {
	                commentRepository.deleteById(commentId);
	                System.out.println("댓글 삭제 성공");
	            } else {
	                System.out.println("삭제 권한 없음");
	                throw new IllegalArgumentException("권한이 없습니다.");
	            }
	        } else {
	            System.out.println("댓글을 찾을 수 없음");
	            throw new IllegalArgumentException("댓글을 찾을 수 없습니다.");
	        }
	    }
	    
	    @Transactional
	    public INFOCOMMENT updateComment(String userId, Integer commentId, String content) {
	        INFOCOMMENT existingComment = commentRepository.findById(commentId).orElse(null);
	
	        if (existingComment == null) {
	            throw new IllegalArgumentException("해당 ID의 댓글을 찾을 수 없습니다.");
	        }
	
	        if (!existingComment.getUserId().equals(userId)) {
	            throw new IllegalArgumentException("댓글 작성자만 수정할 수 있습니다.");
	        }
	
	        existingComment.setContent(content);
	        //수정 날짜 업데이트 추가 로직
	        existingComment.setCommentDate(new Date());
	        return commentRepository.save(existingComment);
	    }

}
