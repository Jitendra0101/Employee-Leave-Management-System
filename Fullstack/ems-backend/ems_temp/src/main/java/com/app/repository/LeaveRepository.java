package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Leave;

@Repository
<<<<<<< HEAD:Fullstack/ems-backend/ems_temp/src/main/java/com/app/repository/DepartmentRepository.java
public interface DepartmentRepository extends JpaRepository<Department, Integer>{
=======
public interface LeaveRepository extends JpaRepository<Leave, Long> {
>>>>>>> 0a9f3ce2362536647021b6f6ab5ca655f4ddadc1:Fullstack/ems-backend/ems_temp/src/main/java/com/app/repository/LeaveRepository.java

}
