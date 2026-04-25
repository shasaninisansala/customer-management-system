package com.example.customer.data;

import jakarta.persistence.*;

@Entity
@Table(name = "family_relation")
public class FamilyRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "family_member_id", nullable = false)
    private Customer familyMember;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Customer getFamilyMember() {
        return familyMember;
    }

    public void setFamilyMember(Customer familyMember) {
        this.familyMember = familyMember;
    }
}
