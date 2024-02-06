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
import com.app.model.Department;
import com.app.model.Employee;
import com.app.service.DepartmentService;
import com.app.service.EmployeeService;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private DepartmentService departmentService;

	@PostMapping
	public ResponseEntity<Employee> addEmp(@RequestBody EmployeeDto empDto) {
		
		Department dept = departmentService.getDeptById(empDto.getDeptNo());

		Employee emp = new Employee(null, empDto.getName(), empDto.getAge(), dept);
		
		return new ResponseEntity<>(employeeService.addEmployee(emp), HttpStatus.OK);

	}

	@GetMapping("/{id}")
	public ResponseEntity<Employee> getEmpById(@PathVariable Integer id) {

		return new ResponseEntity<>(employeeService.getEmpById(id), HttpStatus.OK);

	}

	@GetMapping
	public ResponseEntity<List<Employee>> getAllEmps() {

		return new ResponseEntity<>(employeeService.getAllEmps(), HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmp(@PathVariable Integer id) {

		return new ResponseEntity<>(employeeService.deleteEmp(id), HttpStatus.OK);

	}

	@PutMapping("/{id}")
	public ResponseEntity<Employee> updateEmp(@RequestBody Employee emp, @PathVariable Integer id) {

		return new ResponseEntity<>(employeeService.updateEmpById(emp, id), HttpStatus.OK);

	}

}
