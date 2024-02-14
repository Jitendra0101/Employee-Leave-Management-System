package com.app.dto;

import java.time.LocalDate;
import java.util.Date;

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
	private LocalDate startDate;
    private LocalDate endDate;
    private String leaveType;
    private String status;
    private String reason;
    
   
}
