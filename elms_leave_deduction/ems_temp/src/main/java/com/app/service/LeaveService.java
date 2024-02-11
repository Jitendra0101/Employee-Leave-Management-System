package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Employee;
import com.app.model.Leave;
import com.app.repository.LeaveRepository;

import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@Transactional
@Data
@AllArgsConstructor
public class LeaveService {

	@Autowired
	private LeaveRepository leaveRepository;

	public String applyLeave(Leave leave,Employee emp) {
		emp.addLeave(leave);
		Leave rleave =leaveRepository.save(leave);
		return "Leave applied succsessfully";
	}

	public List<Leave> getAllLeaves() {
		return leaveRepository.findAll();
	}

	public Leave getLeaveById(Long id) {
		return leaveRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("leave  with given id : " + id + ", does NOT exist !!"));
	}
	
	public Leave updateLeaveById(Leave leave, Long id) {

		leave.setId(id);
		return leaveRepository.save(leave);

	} 
	
	public String cancelLeave(Long id) {

		if (!leaveRepository.existsById(id))
			throw new ResourceNotFoundException("Leave with given id : " + id + ", does NOT exist !!");

		leaveRepository.deleteById(id);
		return "Leave canceled Successfully !!";

	}
}
