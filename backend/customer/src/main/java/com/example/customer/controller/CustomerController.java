package com.example.customer.controller;

import com.example.customer.data.Customer;
import com.example.customer.dto.CustomerDTO;
import com.example.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping(path = "/customers")
    public Customer createCustomer(@RequestBody Customer customer){
        return customerService.createCustomer(customer);
    }

    @PutMapping(path = "/customers/{id}")
    public Customer updateCustomer(@RequestBody Customer customer){
        return customerService.updateCustomer(customer);
    }

    @GetMapping(path = "/customers")
    public List<CustomerDTO> getAll() {
        return customerService.getAllCustomers();
    }

    @GetMapping(path = "/customers/{id}")
    public Customer getCustomerById(@PathVariable Integer id){
        return customerService.getCustomerById(id);
    }

    @PostMapping("/upload")
    public String uploadExcel(@RequestParam("file") MultipartFile file) {
        customerService.uploadCustomers(file);
        return "Excel uploaded successfully!";
    }

}
