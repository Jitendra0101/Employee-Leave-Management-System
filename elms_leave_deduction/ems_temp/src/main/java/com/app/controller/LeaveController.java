package com.app.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LeaveDto;
import com.app.model.Employee;
import com.app.model.Leave;
import com.app.model.LeaveType;
import com.app.service.EmployeeService;
import com.app.service.LeaveService;
import static com.app.utils.LeaveUtils.*;

@RestController
@RequestMapping("/{empid}/leaves")
public class LeaveController {

	@Autowired
	private LeaveService leaveService;

	@Autowired
	private EmployeeService employeeService;

	@PostMapping("/applyLeave")
	public ResponseEntity<String> applyLeave(@RequestBody LeaveDto leaveDto, @PathVariable Long empid) {
		LeaveType leaveType = LeaveType.valueOf(leaveDto.getLeaveType().toUpperCase());

		Employee emp = employeeService.getEmpById(empid);

		Leave leave = new Leave();

		// leave.setEmployee(emp);
		leave.setStartDate(leaveDto.getStartDate());
		leave.setEndDate(leaveDto.getEndDate());
		leave.setLeaveType(leaveType);
		leave.setReason(leaveDto.getReason());
		// emp.addLeave(leave);

		int leaveDurationInDays = calculateLeaveDurationInDays(leaveDto.getStartDate(), leaveDto.getEndDate());
		if (!hasSufficientLeaveBalance(emp, leaveType, leaveDurationInDays)) {
			return new ResponseEntity<>("Insufficient leave balance", HttpStatus.BAD_REQUEST);
		}

		if(doesLeaveWithSameStartDateExist(leave,emp,leaveService)) {
			return new ResponseEntity<>("Leave startDate overlapping with already applied leave", HttpStatus.BAD_REQUEST);
			
			}
		deductLeaveBalance(emp, leaveType, leaveDurationInDays, employeeService);

		return new ResponseEntity<>(leaveService.applyLeave(leave, emp), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<Leave>> getAllLeaves() {

		return new ResponseEntity<>(leaveService.getAllLeaves(), HttpStatus.OK);

	}

	@GetMapping("/{id}")
	public ResponseEntity<Leave> getLeaveById(@PathVariable Long id) {

		return new ResponseEntity<>(leaveService.getLeaveById(id), HttpStatus.OK);

	}

	@PutMapping("/{id}")
	public ResponseEntity<Leave> updateLeave(@RequestBody Leave leave, @PathVariable Long id) {

		return new ResponseEntity<>(leaveService.updateLeaveById(leave, id), HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> cancelLeave(@PathVariable Long id, @PathVariable Long empid) {

		Employee emp = employeeService.getEmpById(empid);
		Leave leave = leaveService.getLeaveById(id);
		emp.removeLeave(leave);

		return new ResponseEntity<>(leaveService.cancelLeave(id), HttpStatus.OK);

	}

}
