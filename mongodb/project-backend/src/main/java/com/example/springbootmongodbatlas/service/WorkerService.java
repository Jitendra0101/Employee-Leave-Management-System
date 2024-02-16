package com.example.springbootmongodbatlas.service;

import java.util.List;

import com.example.springbootmongodbatlas.entity.Worker;

public interface WorkerService {

	public List<Worker> getWorkers();

	public Worker getWorkerById(Integer id);

	public Worker addWorker(Worker worker);

	public Worker deleteWorker(Integer id);

	public Worker updateWorker(Integer id, Worker worker);

	public Worker getWorkerByUserNameAndPassword(String userName,String password);

}
