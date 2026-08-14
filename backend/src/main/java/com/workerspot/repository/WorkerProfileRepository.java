package com.workerspot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workerspot.entity.User;
import com.workerspot.entity.WorkerProfile;

public interface WorkerProfileRepository extends JpaRepository<WorkerProfile, Long> {

    Optional<WorkerProfile> findByUser(User user);

    Optional<WorkerProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}