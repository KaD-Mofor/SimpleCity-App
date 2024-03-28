package com.simple_city.app.service;

import com.simple_city.app.dao.CustomerRepository;
import com.simple_city.app.entities.Cart;
import com.simple_city.app.entities.Customer;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    public Customer checkExistingCustomerEmail(String email) {
        Customer customer = customerRepository.findByEmail(email);

        processCustomer(customer);
        return customer;
    }
    @Transactional
    public Customer checkExistingCustomerByNames(String firstName, String lastName) {
        Customer customer = customerRepository.findByFirstNameAndLastName(firstName, lastName);

        processCustomer(customer);

        return customer;
    }

    private void processCustomer(Customer customer) {
        if (customer != null) {
            //Eagerly fetch the carts collection
            customer.getCarts().size();
            save(customer);
            updateLastUpdate(customer);
        }
    }

    public Date updateLastUpdate(Customer existingCustomer) {
        return existingCustomer.getLast_update();
    }

    public Customer save(Customer customer) {

        // Save the customer first
        customer = customerRepository.save(customer);
        return customer;
    }
}
