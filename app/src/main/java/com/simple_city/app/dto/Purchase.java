package com.simple_city.app.dto;

import com.simple_city.app.entities.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Data
public class Purchase {

    private Customer customer;
    private Address address;
    private Cart cart;
    private Set<CartItem> cartItems;


}
