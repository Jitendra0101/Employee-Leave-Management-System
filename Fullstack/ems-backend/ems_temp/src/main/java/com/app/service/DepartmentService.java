package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Department;
import com.app.repository.DepartmentRepository;

import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@Data
@AllArgsConstructor
public class DepartmentService {

	@Autowired
	private DepartmentRepository departmentRepository;

	public Department addDept(Department dept) {

		return departmentRepository.save(dept);

	}

	public Department getDeptById(Integer id) {

		return departmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Department with given id : " + id + " does NOT exist !!"));

	}

	public List<Department> getAllDepts() {

		return departmentRepository.findAll();
	}

	public String deleteDeptById(Integer id) {

		if (departmentRepository.existsById(id)) {
			departmentRepository.deleteById(id);
			return "successfully deleted";
		} else {
			return "department with given id doesnt exist !!!";
		}
	}

	public Department updateDeptById(Department dept, Integer id) {

		dept.setId(id);
		return departmentRepository.save(dept);

	}

}
