package com.simple_city.app.dto;

import com.simple_city.app.entities.*;
import lombok.Data;

import java.util.Set;


@Data
public class Purchase {

    private Customer customer;
    private Address address;
    private Cart cart;
    private Set<CartItemItem> cartItemItems;
}
