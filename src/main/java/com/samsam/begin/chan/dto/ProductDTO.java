package com.samsam.begin.chan.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDTO {
	
	private Integer product_number;
	private String product_upload;
	private String product_update;
	private String product_title;
	private String product_content;
	private Integer product_price;
	private String product_status;
	private String product_category;
	private String member_id;

}
