package com.samsam.begin.chan.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Product {
	
	@Id
	@SequenceGenerator(name = "product_seq_gen", sequenceName = "product_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq_gen")
	@Column(name = "product_number")
	private Integer productNumber;
	
	@Column(name = "product_upload")
	private String productUpload;
	
	@Column(name = "product_update")
	private String productUpdate;

	@Column(name = "product_title")
	private String productTitle;

	@Column(name = "product_content")
	private String productContent;

	@Column(name = "product_price")
	private Integer productPrice;

	@Column(name = "product_status")
	private String productStatus;

	@Column(name = "product_category")
	private String productCategory;

	@Column(name = "member_id")
	private String memberId;

}
