package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

	private String name;
	private int age;
	private Integer deptNo;
	
}
