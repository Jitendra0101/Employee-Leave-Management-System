package com.example.springbootmongodbatlas.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Document(collection ="products")
public class Product {
	
	@Transient
	public static final String SEQUENCE_NAME = "products_sequence";
	
    @Id
    private Integer id;
    private String name;
    private double price;
    private Integer quantity;
}
