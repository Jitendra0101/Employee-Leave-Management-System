package com.app.dto;

import java.util.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

import com.app.model.Employee;
import com.app.model.LeaveType;

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
public class LeaveDto {
	private Date startDate;
    private Date endDate;
    private String leaveType;
    private String status;
    private String reason;
    
   
}
