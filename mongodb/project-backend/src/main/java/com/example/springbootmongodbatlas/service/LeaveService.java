package com.example.springbootmongodbatlas.service;

import java.util.List;

import com.example.springbootmongodbatlas.entity.Leave;
import com.example.springbootmongodbatlas.entity.Worker;

public interface LeaveService {

	public List<Leave> getAllLeaves(Integer workerId);
	
	public Leave getLeave(Integer id);
	
	public Leave addLeave(Leave leave, Worker worker);
	
	public Leave deleteLeave(Leave leave);
	
	public Leave updateStatus(Leave leave, Worker worker, Integer id);
	
}