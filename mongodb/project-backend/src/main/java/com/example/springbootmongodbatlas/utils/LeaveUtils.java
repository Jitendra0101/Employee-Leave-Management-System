package com.example.springbootmongodbatlas.utils;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import com.example.springbootmongodbatlas.entity.Leave;
import com.example.springbootmongodbatlas.entity.LeaveType;
import com.example.springbootmongodbatlas.entity.Worker;
import com.example.springbootmongodbatlas.exceptions.InvalidInputException;
import com.example.springbootmongodbatlas.service.LeaveService;
import com.example.springbootmongodbatlas.service.WorkerService;

public class LeaveUtils {

	public static int calculateLeaveDurationInDays(LocalDate startDate, LocalDate endDate)
			throws InvalidInputException {

		if (startDate.isBefore(endDate)) {
			Period period = Period.between(startDate, endDate);

			int days = period.getDays();
			int months = period.getMonths();
			int years = period.getYears();

			int totalDays = (years * 365) + (months * 30) + days;

			return totalDays;
		} else {
			throw new InvalidInputException("leave start date must be before leave end date");
		}

	}

	public static boolean hasSufficientLeaveBalance(Worker worker, LeaveType leaveType, int leaveDurationInDays) {
		// Implement logic to check if the employee has sufficient leave balance
		switch (leaveType) {
		case SICK_LEAVE:
			return worker.getSickLeaveBalance() >= leaveDurationInDays;
		case CASUAL_LEAVE:
			return worker.getCasualLeaveBalance() >= leaveDurationInDays;
		case PRIVILEGE_LEAVE:
			return worker.getPrivilegeLeaveBalance() >= leaveDurationInDays;
		default:
			return false;
		}
	}

	public static void deductLeaveBalance(Worker worker, LeaveType leaveType, int leaveDurationInDays,
			WorkerService workerService) {

		Integer workerid = worker.getId();
		// Deduct leave balance based on leave type and duration
		switch (leaveType) {
		case SICK_LEAVE:
			worker.setSickLeaveBalance(worker.getSickLeaveBalance() - leaveDurationInDays);
			break;
		case CASUAL_LEAVE:
			worker.setCasualLeaveBalance(worker.getCasualLeaveBalance() - leaveDurationInDays);
			break;
		case PRIVILEGE_LEAVE:
			worker.setPrivilegeLeaveBalance(worker.getPrivilegeLeaveBalance() - leaveDurationInDays);
			break;
		}

		// Update the employee entity in the database
		workerService.updateWorker(workerid, worker);
	}

	public static boolean doesLeaveWithSameStartDateExist(Leave newLeave, Worker worker, LeaveService leaveService) {

		Integer workerid = worker.getId();
		LocalDate startDate = newLeave.getStartDate();
		List<Leave> existingLeaves = leaveService.getAllLeavesByStartDate(workerid, startDate);

		for (Leave existingLeave : existingLeaves) {
			if (newLeave.getStartDate().isEqual(existingLeave.getStartDate())) {
				return true;
			}

		}
		return false;
	}

}
