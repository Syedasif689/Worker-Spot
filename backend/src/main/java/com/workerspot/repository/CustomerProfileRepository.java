package com.workerspot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workerspot.entity.CustomerProfile;
import com.workerspot.entity.User;

public interface CustomerProfileRepository extends JpaRepository<CustomerProfile, Long> {

    Optional<CustomerProfile> findByUser(User user);

    Optional<CustomerProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}