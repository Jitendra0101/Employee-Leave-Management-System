package com.example.springbootmongodbatlas.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.springbootmongodbatlas.entity.Worker;
import com.example.springbootmongodbatlas.repo.WorkerRepository;

import com.example.springbootmongodbatlas.service.WorkerService;

@Service
public class WorkerServiceImpl implements WorkerService {

	@Autowired
	private WorkerRepository workerRepository;

	@Autowired
	private SequenceGeneratorServiceImpl generatorServiceImpl;

	@Override
	public List<Worker> getWorkers() {
		return workerRepository.findAll();
	}

	@Override
	public Worker getWorkerById(Integer id) {
		return workerRepository.findById(id).get();
	}

	@Override
	public Worker addWorker(Worker worker) {
		worker.setId(generatorServiceImpl.generateSequence(Worker.SEQUENCE_NAME));
		return workerRepository.save(worker);
	}

	@Override
	public Worker deleteWorker(Integer id) {
		Worker worker = workerRepository.findById(id).get();
		workerRepository.delete(worker);
		return worker;
	}

	@Override
	public Worker updateWorker(Integer id, Worker worker) {
		Worker worker2 = workerRepository.findById(id).get();
		worker2.setUserName(worker.getUserName());
		worker2.setEmail(worker.getEmail());
		worker2.setDesignation(worker.getDesignation());
		worker2.setJoinDate(worker.getJoinDate());

		return workerRepository.save(worker2);
	}
}