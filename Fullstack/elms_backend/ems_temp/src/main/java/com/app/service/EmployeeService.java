package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Employee;
import com.app.model.Leave;
import com.app.repository.EmployeeRepository;

import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@Data
@AllArgsConstructor
@Transactional
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	public Employee addEmployee(Employee emp) {

		return employeeRepository.save(emp);

	}

	public Employee getEmpById(long id) {
	

		return employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee with given id : " + id + ", does NOT exist !!"));

	}

	public List<Employee> getAllEmps() {

		return employeeRepository.findAll();

	}

	public String deleteEmp(Long id) {

		if (!employeeRepository.existsById(id))
			throw new ResourceNotFoundException("Employee with given id : " + id + ", does NOT exist !!");

		employeeRepository.deleteById(id);
		return "employee deleted Successfully !!";

	}

	public Employee updateEmpById(Employee emp, Long id) {

		emp.setId(id);
		return employeeRepository.save(emp);

	}

	public List<Leave> getAllLeaves(Employee employee) {
	
		List<Leave> leaves = employee.getLeaves();
		return leaves;

		
	}

}
