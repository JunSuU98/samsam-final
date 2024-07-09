package com.samsam.begin.wook.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class CommentDTO {
	
	    private Integer commentId;
	    private String userId;
	    private String content;
	    private Date commentDate;
	    private boolean ChackAuthority;

}
