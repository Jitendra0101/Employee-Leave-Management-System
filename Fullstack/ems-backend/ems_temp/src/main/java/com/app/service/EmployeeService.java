package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Employee;
import com.app.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	public Employee addEmployee(Employee emp) {

		return employeeRepository.save(emp);

	}

	public Employee getEmpById(Integer id) {

		return employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee with given id : " + id + " does NOT exist !!"));

	}

	public List<Employee> getAllEmps() {

		return employeeRepository.findAll();

	}

	public String deleteEmp(Integer id) {

		if (!employeeRepository.existsById(id))
			return "employee with given id does NOT exist !!";

		employeeRepository.deleteById(id);
		return "employee deleted Successfully !!";

	}

	public Employee updateEmpById(Employee emp, Integer id) {

		emp.setId(id);
		return employeeRepository.save(emp);

	}

}
