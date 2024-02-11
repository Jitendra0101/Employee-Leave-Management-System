package com.app.utils;

import java.time.LocalDate;
import java.time.Period;

import com.app.exceptions.InvalidInputException;
import com.app.model.Employee;
import com.app.model.LeaveType;
import com.app.service.EmployeeService;

public class LeaveUtils {
	public static int calculateLeaveDurationInDays(LocalDate startDate, LocalDate endDate) {
		
		if(startDate.isBefore(endDate)) {
		Period period = Period.between(startDate, endDate);

		int days = period.getDays();
		int months = period.getMonths();
		int years = period.getYears();

	int totalDays = (years * 365) + (months * 30) + days;

		return totalDays;
		}
		else {
			throw new InvalidInputException("leave start date must be before leave end date");
		}

	}
	
	public static boolean hasSufficientLeaveBalance(Employee emp, LeaveType leaveType, int leaveDurationInDays) {
	    // Implement logic to check if the employee has sufficient leave balance
	    switch (leaveType) {
	        case SICK_LEAVE:
	            return emp.getSickLeaveBalance() >= leaveDurationInDays;
	        case CASUAL_LEAVE:
	            return emp.getCasualLeaveBalance() >= leaveDurationInDays;
	        case PRIVILEGE_LEAVE:
	            return emp.getPrivilegeLeaveBalance() >= leaveDurationInDays;
	        default:
	            return false;
	    }
	}
	public static void deductLeaveBalance(Employee emp, LeaveType leaveType, int leaveDurationInDays,EmployeeService employeeService) {
		
		Long empid= emp.getId();
	    // Deduct leave balance based on leave type and duration
	    switch (leaveType) {
	        case SICK_LEAVE:
	            emp.setSickLeaveBalance(emp.getSickLeaveBalance() - leaveDurationInDays);
	            break;
	        case CASUAL_LEAVE:
	            emp.setCasualLeaveBalance(emp.getCasualLeaveBalance() - leaveDurationInDays);
	            break;
	        case PRIVILEGE_LEAVE:
	            emp.setPrivilegeLeaveBalance(emp.getPrivilegeLeaveBalance() - leaveDurationInDays);
	            break;
	    }
	   
		// Update the employee entity in the database
	    employeeService.updateEmpById(emp, empid);
	}

}
