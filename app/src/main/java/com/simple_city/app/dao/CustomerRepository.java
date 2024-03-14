package com.simple_city.app.dao;

import com.simple_city.app.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
