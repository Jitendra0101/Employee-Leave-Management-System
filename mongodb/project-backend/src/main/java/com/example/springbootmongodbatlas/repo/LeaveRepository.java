package com.example.springbootmongodbatlas.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.springbootmongodbatlas.entity.Leave;

@Repository
public interface LeaveRepository extends MongoRepository<Leave, Integer>{

}
