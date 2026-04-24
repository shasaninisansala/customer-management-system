package com.example.customer.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepo extends JpaRepository<Customer,Integer> {
    @Query("select c from customer c where c.nic=?1")
    public List<Customer> searchCustomer(String nic);

}
