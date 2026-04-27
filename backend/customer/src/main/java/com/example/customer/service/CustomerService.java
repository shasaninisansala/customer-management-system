package com.example.customer.service;

import com.example.customer.data.*;
import com.example.customer.dto.CustomerDTO;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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

        // connect mobile numbers
        if (customer.getMobileNumbers() != null) {
            for (MobileNumber mobile : customer.getMobileNumbers()) {
                mobile.setCustomer(customer);
            }
        }

        // connect addresses
        if (customer.getAddresses() != null) {
            for (Address address : customer.getAddresses()) {
                address.setCustomer(customer);
            }
        }

        // connect family relations
        if (customer.getFamilyRelations() != null) {
            for (FamilyRelation relation : customer.getFamilyRelations()) {
                relation.setCustomer(customer);
            }
        }

      return customerRepo.save(customer);
    }

    //update customer
    public Customer updateCustomer(Customer customer) {

        Customer existingCustomer = customerRepo.findById(customer.getId())
                .orElseThrow(() ->
                        new RuntimeException("Customer not found with id: " + customer.getId()));


        Customer nicCustomer = customerRepo.findByNic(customer.getNic()).orElse(null);

        if (nicCustomer != null &&
                !nicCustomer.getId().equals(customer.getId())) {
            throw new RuntimeException("NIC already exists!");
        }

        existingCustomer.setName(customer.getName());
        existingCustomer.setDob(customer.getDob());
        existingCustomer.setNic(customer.getNic());

        existingCustomer.getMobileNumbers().clear();
        existingCustomer.getAddresses().clear();
        existingCustomer.getFamilyRelations().clear();

        if (customer.getMobileNumbers() != null) {
            for (MobileNumber mobile : customer.getMobileNumbers()) {
                mobile.setId(null);
                mobile.setCustomer(existingCustomer);
                existingCustomer.getMobileNumbers().add(mobile);
            }
        }

        if (customer.getAddresses() != null) {
            for (Address address : customer.getAddresses()) {
                address.setId(null);
                address.setCustomer(existingCustomer);
                existingCustomer.getAddresses().add(address);
            }
        }

        if (customer.getFamilyRelations() != null) {
            for (FamilyRelation relation : customer.getFamilyRelations()) {
                relation.setId(null);
                relation.setCustomer(existingCustomer);
                existingCustomer.getFamilyRelations().add(relation);
            }
        }

        return customerRepo.save(existingCustomer);
    }


    //get customer by id
    public Customer getCustomerById(Integer id) {
        Optional<Customer> customer = customerRepo.findById(id);

        if (customer.isPresent()) {
            return customer.get();
        }

        throw new RuntimeException("Customer not found!");
    }

    //excel upload
    public void uploadCustomers(MultipartFile file) {

        try (
                InputStream inputStream = file.getInputStream();
                Workbook workbook = WorkbookFactory.create(inputStream)
        ) {

            Sheet sheet = workbook.getSheetAt(0);

            List<Customer> batch = new ArrayList();

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {

                Row row = sheet.getRow(i);

                if (row == null) {
                    continue;
                }

                String name = row.getCell(0).getStringCellValue();
                String dobString = row.getCell(1).getStringCellValue();
                String nic = row.getCell(2).getStringCellValue();

                // skip duplicate NIC
                if (customerRepo.existsByNic(nic)) {
                    continue;
                }

                Customer customer = new Customer();
                customer.setName(name);
                customer.setDob(LocalDate.parse(dobString));
                customer.setNic(nic);

                batch.add(customer);

                // save every 1000 rows
                if (batch.size() == 1000) {
                    customerRepo.saveAll(batch);
                    batch.clear();
                }
            }

            // save remaining rows
            if (!batch.isEmpty()) {
                customerRepo.saveAll(batch);
            }

        } catch (Exception e) {
            throw new RuntimeException("Excel upload failed: " + e.getMessage());
        }
    }
    public List<CustomerDTO> getAllCustomers() {

        List<Customer> customers = customerRepo.findAll();

        return customers.stream().map(c -> {

            CustomerDTO dto = new CustomerDTO();

            dto.setId(c.getId());
            dto.setName(c.getName());
            dto.setDob(c.getDob());
            dto.setNic(c.getNic());

            // mobile numbers
            dto.setMobileNumbers(
                    c.getMobileNumbers() == null ? List.of()
                            : c.getMobileNumbers()
                            .stream()
                            .map(MobileNumber::getMobileNumber)
                            .toList()
            );

            // addresses
            dto.setAddresses(
                    c.getAddresses() == null ? List.of()
                            : c.getAddresses().stream()
                            .map(a ->
                                    a.getAddressLine1() +
                                            (a.getAddressLine2() != null ? ", " + a.getAddressLine2() : "")
                            )
                            .toList()
            );

            // family members
            dto.setFamilyMembers(
                    c.getFamilyRelations() == null ? List.of()
                            : c.getFamilyRelations()
                            .stream()
                            .map(f -> f.getFamilyMember().getName())
                            .toList()
            );

            dto.setCities(
                    c.getAddresses() == null ? List.of()
                            : c.getAddresses().stream()
                            .map(a -> a.getCity() != null ? a.getCity().getCityName() : null)
                            .filter(Objects::nonNull)
                            .toList()
            );

            dto.setCountries(
                    c.getAddresses() == null ? List.of()
                            : c.getAddresses().stream()
                            .map(a -> a.getCountry() != null ? a.getCountry().getCountryName() : null)
                            .filter(Objects::nonNull)
                            .toList()
            );

            return dto;

        }).toList();
    }
}
