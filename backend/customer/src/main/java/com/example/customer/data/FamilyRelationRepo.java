package com.example.customer.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyRelationRepo extends JpaRepository<FamilyRelation,Integer> {
    List<FamilyRelation> findByCustomerId(Integer customerId);
}
