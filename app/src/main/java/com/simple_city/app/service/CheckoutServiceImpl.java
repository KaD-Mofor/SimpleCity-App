package com.simple_city.app.service;

import com.simple_city.app.dao.CustomerRepository;
import com.simple_city.app.dto.*;
import com.simple_city.app.entities.*;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Service
public class CheckoutServiceImpl implements CheckoutService{
    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

//    @Override
//    @Transactional
//    public PurchaseResponse placeOrder(Purchase purchase) {
//        //get cart info from dto
//        Cart cart = purchase.getCart();
//
//        //generate tracking number
//        String trackingNumber = generateTrackingNumber();
//        cart.setOrderTrackingNumber(trackingNumber);
//
//        //Fill cart with cart items
//        Set<CartItem> cartItems = purchase.getCartItems();
//        cartItems.forEach(cart::add);
//
//        //populate cart with address
//        cart.setAddress(purchase.getAddress());
//
//        //populate customer with cart
//        Customer customer = purchase.getCustomer();
//        customer.add(cart);
//
//        //save to the db
//        customerRepository.save(customer);
//
//        //return response
//        return new PurchaseResponse(trackingNumber);
//    }

//    @Override
//    @Transactional
//    public PurchaseResponse placeOrder(Purchase purchase) {
//        //get cart info from dto
//        Cart cart = purchase.getCart();
//
//        // Check if cart is null
//        if (cart == null) {
//            throw new IllegalArgumentException("Cart cannot be null");
//        }
//
//        //generate tracking number
//        String trackingNumber = generateTrackingNumber();
//        cart.setOrderTrackingNumber(trackingNumber);
//
//        //Fill cart with cart items
//        Set<CartItem> cartItems = purchase.getCartItems();
//        if (cartItems != null) {
//            cartItems.forEach(item -> cart.add(item));
//        }
//
//        //populate cart with address
//        cart.setAddress(purchase.getAddress());
//
//        //populate customer with cart
//        Customer customer = purchase.getCustomer();
//        if (customer != null) {
//            customer.add(cart);
//        }
//
//        //save to the db
//        assert customer != null;
//        customerRepository.save(customer);
//
//        //return response
//        return new PurchaseResponse(trackingNumber);
//    }


    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // Get cart info from DTO
        Cart cart = purchase.getCart();

        // Check if cart is null
        if (cart == null) {
            throw new IllegalArgumentException("Cart cannot be null");
        }

        // Generate tracking number
        String trackingNumber = generateTrackingNumber();
        cart.setOrderTrackingNumber(trackingNumber);

        // Fill cart with cart items
        Set<CartItem> cartItems = purchase.getCartItems();
        if (cartItems != null) {
            cartItems.forEach(item -> cart.add(item));
        }

        // Populate cart with address
        Address address = purchase.getAddress();
        if (address == null) {
            throw new IllegalArgumentException("Address cannot be null");
        }

        // Associate the address with the cart
        cart.setAddress(address);

        // Populate customer with cart
        Customer customer = purchase.getCustomer();
        if (customer != null) {
            customer.add(cart);
        }

        // Associate the customer with the cart
        customer.add(cart);

        // Save to the DB
        customerRepository.save(customer);

        // Return response
        return new PurchaseResponse(trackingNumber);
    }


    private String generateTrackingNumber() {
        //Generate a random UUID number (UUID version-4) as trackingNumber.

        return "SIMPLE-" + UUID.randomUUID().toString();
    }
}
