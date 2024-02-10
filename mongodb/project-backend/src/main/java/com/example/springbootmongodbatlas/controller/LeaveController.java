package com.example.springbootmongodbatlas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootmongodbatlas.dto.LeaveDto;
import com.example.springbootmongodbatlas.entity.Leave;
import com.example.springbootmongodbatlas.entity.LeaveType;
import com.example.springbootmongodbatlas.entity.Worker;
import com.example.springbootmongodbatlas.service.LeaveService;
import com.example.springbootmongodbatlas.service.WorkerService;

@RestController
@RequestMapping("/{workerId}/leaves")
public class LeaveController {

	@Autowired
	private LeaveService leaveService;

	@Autowired
	private WorkerService workerService;

	@PostMapping("/apply")
	public Leave applyLeave(@RequestBody LeaveDto leaveDto, @PathVariable Integer workerId) {
		
		LeaveType leaveType = LeaveType.valueOf(leaveDto.getLeaveType().toUpperCase());
		Worker worker = workerService.getWorkerById(workerId);
		
		Leave leave = new Leave();
		
		leave.setStartDate(leaveDto.getStartDate());
		leave.setEndDate(leaveDto.getEndDate());
		leave.setLeaveType(leaveType);
		leave.setReason(leaveDto.getReason());
		leave.setWorkerid(workerId);
		
		return leaveService.addLeave(leave,worker);
	}
	
	@GetMapping
	public List<Leave> getAllLeaves(){
		return leaveService.getAllLeaves();
	}
	
	@GetMapping("/{id}")
	public Leave getLeave(@PathVariable Integer id) {
		return leaveService.getLeave(id);
	}
	
	@PutMapping("/{id}")
	public Leave updateLeave(@RequestBody Leave leave, @PathVariable Integer id) {
		return leaveService.updateLeave(leave, id);
	}
	
	public Leave deleteLeave(@PathVariable Integer id, @PathVariable Integer workerId) {
		Worker worker = workerService.getWorkerById(workerId);
		Leave leave = leaveService.getLeave(id);
		worker.removeLeave(leave);
		
		return leaveService.deleteLeave(id);
	}
	
	

}
