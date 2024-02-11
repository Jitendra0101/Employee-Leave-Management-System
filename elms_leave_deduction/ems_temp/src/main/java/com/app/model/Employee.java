package com.app.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Employees")
@Data
@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class Employee {
	
	

	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private String name;
	    private String email;
	    private String department;
	    private int sickLeaveBalance=2;
	    private int casualLeaveBalance=4;
	    private int privilegeLeaveBalance=6;
	    
	    
	   
//fetchtype eager then serialization error if lazy then lazyinitexception
		@OneToMany(mappedBy = "employee",fetch = FetchType.EAGER,cascade =CascadeType.ALL,orphanRemoval = true) 
		@JsonIgnore
		private List<Leave> leaves = new ArrayList<Leave>();
	   

		public void addLeave(Leave leave) {
			leaves.add(leave);
			leave.setMyEmp(this);
	
		}
		
		public void removeLeave(Leave leave) {
			leaves.remove(leave);
		}
}
