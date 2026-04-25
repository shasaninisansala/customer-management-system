package com.example.customer.service;

import com.example.customer.data.Customer;
import com.example.customer.data.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;

    //create customer
    public Customer createCustomer (Customer customer){

        if (customerRepo.existsByNic(customer.getNic())) {
            throw new RuntimeException("NIC already exists!");
        }
      return customerRepo.save(customer);
    }

    //update customer
    public Customer updateCustomer(Customer customer) {

        Customer existingCustomer = customerRepo.findById(customer.getId())
                .orElseThrow(() ->
                        new RuntimeException("Customer not found with id: " + customer.getId()));

        // check NIC duplicate
        Customer nicCustomer = customerRepo.findByNic(customer.getNic()).orElse(null);

        if (nicCustomer != null &&
                !nicCustomer.getId().equals(customer.getId())) {
            throw new RuntimeException("NIC already exists!");
        }

        existingCustomer.setName(customer.getName());
        existingCustomer.setDob(customer.getDob());
        existingCustomer.setNic(customer.getNic());

        return customerRepo.save(existingCustomer);
    }

    // get all customers
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    //get customer by id
    public Customer getCustomerById(Integer id) {
        Optional<Customer> customer = customerRepo.findById(id);

        if (customer.isPresent()) {
            return customer.get();
        }

        throw new RuntimeException("Customer not found!");
    }

}
