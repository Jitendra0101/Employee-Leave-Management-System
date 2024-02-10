package com.example.springbootmongodbatlas.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springbootmongodbatlas.entity.Leave;
import com.example.springbootmongodbatlas.entity.Worker;
import com.example.springbootmongodbatlas.repo.LeaveRepository;
import com.example.springbootmongodbatlas.repo.WorkerRepository;
import com.example.springbootmongodbatlas.service.LeaveService;
import com.example.springbootmongodbatlas.service.WorkerService;

@Service
public class LeaveServiceImpl implements LeaveService {

	@Autowired
	private LeaveRepository leaveRepository;
	
	@Autowired
	private WorkerRepository workerRepository;

	@Autowired
	private SequenceGeneratorServiceImpl generatorServiceImpl;

	@Override
	public List<Leave> getAllLeaves() {
		return leaveRepository.findAll();
	}

	@Override
	public Leave getLeave(Integer id) {
		return leaveRepository.findById(id).get();
	}

	@Override
	public Leave addLeave(Leave leave, Worker worker) {
		leave.setId(generatorServiceImpl.generateSequence(Leave.SEQUENCE_NAME));
		worker.addLeave(leave);
		workerRepository.save(worker);
		return leaveRepository.save(leave);
	}

	@Override
	public Leave deleteLeave(Integer id) {
		Leave leave = leaveRepository.findById(id).get();
		leaveRepository.delete(leave);
		return leave;
	}

	@Override
	public Leave updateLeave(Leave leave, Integer id) {
		leave.setId(id);
		return leaveRepository.save(leave);
	}
}