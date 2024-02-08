package com.example.springbootmongodbatlas.repo;

import com.example.springbootmongodbatlas.entity.Department;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DepartmentRepository extends MongoRepository<Department,Integer> {
}
