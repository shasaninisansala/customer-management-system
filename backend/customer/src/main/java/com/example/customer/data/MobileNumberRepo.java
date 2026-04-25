package com.example.customer.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MobileNumberRepo extends JpaRepository<MobileNumber,Integer> {
    List<MobileNumber> findByCustomerId(Integer customerId);
}
