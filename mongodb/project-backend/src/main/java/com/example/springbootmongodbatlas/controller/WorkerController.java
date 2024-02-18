package com.example.springbootmongodbatlas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.springbootmongodbatlas.entity.Worker;
import com.example.springbootmongodbatlas.service.WorkerService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/workers")
public class WorkerController {

	@Autowired
	private WorkerService workerService;

	@GetMapping
	public List<Worker> getWorkers() {
		return workerService.getWorkers();
	}

	@GetMapping("/{id}")
	public Worker getWorkerById(@PathVariable Integer id) {
		return workerService.getWorkerById(id);
	}
	@PostMapping("/username")
	public Worker getWorkerByUserName(@RequestBody String userName){
		return workerService.getWorkerByUserName(userName);
	}
	
	
	@PostMapping("/login")
	public Worker login(@RequestBody Worker worker ) {
		
		String userName= worker.getUserName();
		String password = worker.getPassword();
		return workerService.getWorkerByUserNameAndPassword(userName, password);
	}

	@PostMapping
	public Worker addWorker(@RequestBody Worker worker) {
		return workerService.addWorker(worker);
	}

	@PutMapping("/{id}")
	public Worker updateWorker(@RequestBody Worker worker, @PathVariable Integer id) {
		return workerService.updateWorker(id, worker);
	}

	@DeleteMapping("/{id}")
	public Worker deleteWorker(@PathVariable Integer id) {
		return workerService.deleteWorker(id);
	}
}