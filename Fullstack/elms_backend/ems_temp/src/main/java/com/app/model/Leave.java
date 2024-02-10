package com.app.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Leaves")
@Data
@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class Leave {
	
	
	 

		public Leave(Date startDate2, Date endDate2, LeaveType leaveType2, String status2, String reason2, Long id2) {
			// TODO Auto-generated constructor stub
		}

		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private Date startDate;
	    private Date endDate;
	    
	    @Enumerated(EnumType.STRING)
	    private LeaveType leaveType;
	    private String status="PENDING";
	    private String reason;

	    @ManyToOne
	    @JoinColumn(name="employeeId")
	    private Employee employee;
	    
	    public void setMyEmp(Employee emp) {
	    	this.employee=emp;
	    }

	    
	}


