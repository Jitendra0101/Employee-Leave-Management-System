package com.example.springbootmongodbatlas.controller;

import java.util.List;

import static com.example.springbootmongodbatlas.utils.LeaveUtils.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.springbootmongodbatlas.dto.LeaveDto;
import com.example.springbootmongodbatlas.entity.Leave;
import com.example.springbootmongodbatlas.entity.LeaveType;
import com.example.springbootmongodbatlas.entity.Worker;
import com.example.springbootmongodbatlas.exceptions.InvalidInputException;
import com.example.springbootmongodbatlas.repo.WorkerRepository;
import com.example.springbootmongodbatlas.service.LeaveService;
import com.example.springbootmongodbatlas.service.WorkerService;

@CrossOrigin("*")
@RestController
@RequestMapping("/{workerId}/leaves")
public class LeaveController {

	@Autowired
	private LeaveService leaveService;

	@Autowired
	private WorkerService workerService;

	@Autowired
	private WorkerRepository workerRepository;

	@PostMapping("/apply")
	public Leave applyLeave(@RequestBody LeaveDto leaveDto, @PathVariable Integer workerId)
			throws InvalidInputException {

		LeaveType leaveType = LeaveType.valueOf(leaveDto.getLeaveType().toUpperCase());
		Worker worker = workerService.getWorkerById(workerId);

		Leave leave = new Leave();

		leave.setStartDate(leaveDto.getStartDate());
		leave.setEndDate(leaveDto.getEndDate());
		leave.setLeaveType(leaveType);
		leave.setReason(leaveDto.getReason());
		leave.setWorkerid(workerId);

		int leaveDurationInDays = calculateLeaveDurationInDays(leaveDto.getStartDate(), leaveDto.getEndDate());

		if (!hasSufficientLeaveBalance(worker, leaveType, leaveDurationInDays)) {
			return null;
		}

		if (doesLeaveWithSameStartDateExist(leave, worker, leaveService)) {
			return null;
		}

		deductLeaveBalance(worker, leaveType, leaveDurationInDays, workerService);

		return leaveService.addLeave(leave, worker);
	}

	@GetMapping
	public List<Leave> getAllLeaves(@PathVariable Integer workerId) {
		return leaveService.getAllLeaves(workerId);
	}

	@GetMapping("/{id}")
	public Leave getLeave(@PathVariable Integer id) {
		return leaveService.getLeave(id);
	}

	@PutMapping("/{id}")
	public Leave updateStatus(@RequestBody Leave leave, @PathVariable Integer id, @PathVariable Integer workerId) {
		Worker worker = workerService.getWorkerById(workerId);
		return leaveService.updateStatus(leave, worker, id);
	}

	@DeleteMapping("/{id}")
	public Leave deleteLeave(@PathVariable Integer id, @PathVariable Integer workerId) {
		Worker worker = workerService.getWorkerById(workerId);
		Leave leave = leaveService.getLeave(id);
		worker.removeLeave(leave);
		workerRepository.save(worker);
		return leaveService.deleteLeave(leave);
	}

}
