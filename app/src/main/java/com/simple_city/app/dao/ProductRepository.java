package com.simple_city.app.dao;

import com.simple_city.app.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
}
