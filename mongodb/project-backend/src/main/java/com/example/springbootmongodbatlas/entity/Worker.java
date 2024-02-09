package com.example.springbootmongodbatlas.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Document(collection = "workers")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Worker {
	
	@Transient
	public static final String SEQUENCE_NAME = "workers_sequence";
	
	@Id
	private Integer id;
	
	private String userName;
	
	private String password;
	
	private String email;
	
	private Designation designation;
	
	private LocalDate joinDate;

	
	
}
