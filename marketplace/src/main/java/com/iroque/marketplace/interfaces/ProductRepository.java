package com.iroque.marketplace.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iroque.marketplace.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM product WHERE UPPER(name) LIKE UPPER(concat('%', ?1, '%'))", nativeQuery = true)
    List<Product> findByName(String name);

}
