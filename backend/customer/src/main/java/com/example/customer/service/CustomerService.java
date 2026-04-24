package com.example.customer.service;

import com.example.customer.data.Customer;
import com.example.customer.data.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;

    public Customer createCustomer (Customer customer){
      return customerRepo.save(customer);
    }

    public Customer updateCustomer(Customer customer){
        Customer existingCustomer = customerRepo.findById(customer.getId())
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + customer.getId()));

        existingCustomer.setId(customer.getId());
        existingCustomer.setName(customer.getName());
        existingCustomer.setDob(customer.getDob());
        existingCustomer.setNic(customer.getNic());


        return customerRepo.save(existingCustomer);
    }

}
