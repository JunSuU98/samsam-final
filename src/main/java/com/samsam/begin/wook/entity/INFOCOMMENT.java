package com.samsam.begin.wook.entity;

import java.util.Date;

//import com.samsam.begin.wook.entity.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class INFOCOMMENT {
	
	@Id
    @SequenceGenerator(name = "comment_gen", sequenceName = "COMMENT_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_gen")
    @Column(name = "comment_ID")
	private Integer commentId;
    @Column(name = "user_ID")
	private String userId;
    @Column(name = "Comment_Content")
	private String content;
    @Column(name = "C_M_DATE")
    private Date commentDate;
    
    @ManyToOne
    @JoinColumn(name = "PARENTID" , referencedColumnName = "info_Number")
	public INFO parentID;
	
	

}
