package com.example.customer.controller;


import com.example.customer.data.Country;
import com.example.customer.data.CountryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CountryController {

    @Autowired
    private CountryRepo countryRepo;

    @GetMapping(path = "/countries")
    public List<Country> getAllCountries() {
        return countryRepo.findAll();
    }
}
