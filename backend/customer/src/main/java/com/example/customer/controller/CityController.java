package com.example.customer.controller;

import com.example.customer.data.City;
import com.example.customer.data.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CityController {

    @Autowired
    private CityRepo cityRepo;

    @GetMapping(path = "/cities")
    public List<City> getAllCities(){
        return cityRepo.findAll();
    }
}
