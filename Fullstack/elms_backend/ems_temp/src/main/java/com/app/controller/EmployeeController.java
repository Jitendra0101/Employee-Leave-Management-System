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

import com.app.dto.EmployeeDto;
import com.app.model.Employee;
import com.app.model.Leave;
import com.app.service.EmployeeService;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping
	public ResponseEntity<Employee> addEmp(@RequestBody EmployeeDto empDto) {
		
		

		Employee emp = new Employee();
		emp.setName(empDto.getName());
		emp.setDepartment(empDto.getDepartment());
		emp.setEmail(empDto.getEmail());
	System.out.print(empDto.getName());
	System.out.print(empDto.getEmail());
	
		
		return new ResponseEntity<>(employeeService.addEmployee(emp), HttpStatus.OK);

	}

	@GetMapping("/{id}")
	public ResponseEntity<Employee> getEmpById(@PathVariable long id) {

		return new ResponseEntity<>(employeeService.getEmpById(id), HttpStatus.OK);

	}

	@GetMapping
	public ResponseEntity<List<Employee>> getAllEmps() {

		return new ResponseEntity<>(employeeService.getAllEmps(), HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmp(@PathVariable Long id) {

		return new ResponseEntity<>(employeeService.deleteEmp(id), HttpStatus.OK);

	}

	@PutMapping("/{id}")
	public ResponseEntity<Employee> updateEmp(@RequestBody Employee emp, @PathVariable Long id) {

		return new ResponseEntity<>(employeeService.updateEmpById(emp, id), HttpStatus.OK);

	}
	@GetMapping("/{id}/allLeaves")
	public  ResponseEntity<List<Leave>> getAllLeaves(@PathVariable Long id){
		Employee employee = employeeService.getEmpById(id);
		return new ResponseEntity<>(employeeService.getAllLeaves(employee), HttpStatus.OK);
		
	}

}
