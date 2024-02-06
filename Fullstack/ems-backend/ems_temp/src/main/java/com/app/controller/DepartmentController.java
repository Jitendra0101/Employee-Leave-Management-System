package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Department;
import com.app.service.DepartmentService;

@CrossOrigin("*")
@RestController
@RequestMapping("/departments")
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;

	@PostMapping
	public ResponseEntity<Department> addDept(@RequestBody Department dept) {

		return new ResponseEntity<>(departmentService.addDept(dept), HttpStatus.OK);

	}

	@GetMapping("/{id}")
	public ResponseEntity<Department> getDeptById(@PathVariable Integer id) {

		return new ResponseEntity<>(departmentService.getDeptById(id), HttpStatus.OK);

	}

	@GetMapping
	public ResponseEntity<List<Department>> getAllDepts() {

		return new ResponseEntity<>(departmentService.getAllDepts(), HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteDept(@PathVariable Integer id) {

		return new ResponseEntity<>(departmentService.deleteDeptById(id), HttpStatus.OK);

	}

	@PutMapping("/{id}")
	public ResponseEntity<Department> updateDept(@RequestBody Department dept, @PathVariable Integer id) {

		return new ResponseEntity<>(departmentService.updateDeptById(dept, id), HttpStatus.OK);

	}

}
