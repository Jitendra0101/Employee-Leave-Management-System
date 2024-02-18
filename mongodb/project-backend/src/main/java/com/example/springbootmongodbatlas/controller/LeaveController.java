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
	public String applyLeave(@RequestBody LeaveDto leaveDto, @PathVariable Integer workerId)
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
		    return "Insufficient leave balance for " + leaveType + " for " + leaveDurationInDays + " days. Please review your leave balance and try again.";
		}


		if (doesLeaveOverlapOrIntersect(leave, worker, leaveService)) {
			return "Sorry, your leave request overlaps or intersects with an existing leave. Please check and adjust your leave dates and try again.";
		}

		deductLeaveBalance(worker, leaveType, leaveDurationInDays, workerService);
		Leave validleave =leaveService.addLeave(leave, worker);
		if(validleave!=null)
			return "Leave applied successfully. " + leaveDurationInDays + " days deducted from " + leaveType + " leave balance.";
		else
			return "Leave request submission failed";
		
	}

	@GetMapping
	public List<Leave> getAllLeaves(@PathVariable Integer workerId) {
		return leaveService.getAllLeaves(workerId);
	}

	@GetMapping("/{id}")
	public Leave getLeave(@PathVariable Integer id) {
		return leaveService.getLeave(id);
	}

	@GetMapping("/all/pending")
	public List<Leave> getLeavesByStatusPending(@PathVariable Integer workerId) {
		return leaveService.getAllLeavesByPendingStatus(workerId, "PENDING");
	}

	@GetMapping("/all/accepted")
	public List<Leave> getLeavesByStatusAccepted(@PathVariable Integer workerId) {
		return leaveService.getAllLeavesByAcceptedStatus(workerId, "ACCEPTED");
	}

	@GetMapping("/all/rejected")
	public List<Leave> getLeavesByStatusRejected(@PathVariable Integer workerId) {
		return leaveService.getAllLeavesByRejectedStatus(workerId, "REJECTED");
	}

	@PutMapping("/{id}")
	public Leave updateStatus(@RequestBody Leave leave, @PathVariable Integer id, @PathVariable Integer workerId)
			throws InvalidInputException {
		Worker worker = workerService.getWorkerById(workerId);
		Leave existingLeave = leaveService.getLeave(id);

		if (leave.getStatus().equals("REJECTED")) {

			restoreLeaveBalance(worker, existingLeave, workerRepository);
		}

		Leave updatedLeave = leaveService.updateStatus(leave, worker, id);
		return updatedLeave;
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
