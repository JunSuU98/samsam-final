package com.samsam.begin.wook.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class INFO {

    @Id
    @Column(name = "info_Number")
    @SequenceGenerator(name = "info_gen", sequenceName = "INFO_SEQ", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "info_gen")
    private Integer infoNumber; // CamelCase로 수정
    
    @Column(name = "info_Title")
    private String infoTitle;   // CamelCase로 수정
    
    @Column(name = "info_Date")
    private String infoDate;    // CamelCase로 수정
    
    @Column(name = "info_Content")
    private String infoContent; // CamelCase로 수정
}

