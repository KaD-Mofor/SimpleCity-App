package com.simple_city.app.service;

import com.simple_city.app.dao.AddressRepository;
import com.simple_city.app.dao.CartItemRepository;
import com.simple_city.app.dao.CartRepository;
import com.simple_city.app.dao.CustomerRepository;
import com.simple_city.app.dto.Purchase;
import com.simple_city.app.dto.PurchaseResponse;
import com.simple_city.app.entities.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final CartRepository cartRepository;
    private final CustomerRepository customerRepository;
    private final AddressRepository addressRepository;
    private final CartItemRepository cartItemRepository;

    @Autowired
    public CheckoutServiceImpl(CartRepository cartRepository,
                               CustomerRepository customerRepository,
                               AddressRepository addressRepository,
                               CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.customerRepository = customerRepository;
        this.addressRepository = addressRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        String orderTrackingNumber = generateTrackingNumber();

        // Set the tracking number to the purchase response
        PurchaseResponse purchaseResponse = new PurchaseResponse(orderTrackingNumber);
        purchaseResponse.setOrderTrackingNumber(orderTrackingNumber);

        // Get cart info from dto
        Cart cart = purchase.getCart();

        // Generate a tracking number
        cart.setOrderTrackingNumber(orderTrackingNumber);

        //---------------------------------------------------------

//        // Fill the cart with cartItems
//        Set<CartItem> cartItems = purchase.getCartItems();
//        if (cartItems != null) {
//            cart.setCartItems(cartItems);
//            for (CartItem cartItem : cartItems) {
//                cartItem.setCart(cart);
//            }
//        }
//
//        // Populate the cart with the customer's address
//        Address address = purchase.getAddress();
//        if (address != null) {
//            // Save the address first
//            address = addressRepository.save(address);
//            cart.setAddress(address);
//        }
//
//        // Populate the customer with the cart
//        Customer customer = purchase.getCustomer();
//        if (customer != null) {
//            // Save the customer first
//            customer = customerRepository.save(customer);
//            customer.add(cart);
//        }
//
//        // Save to the database
//        cartRepository.save(cart);
       // -----------------------------------------------------------------------


        // Populate the customer with the cart
        Customer customer = purchase.getCustomer();

        //check if customer already exist in db
        String existingCustomerEmail = customer.getEmail();
        Customer customerDB = customerRepository.findByEmail(existingCustomerEmail);
        if (customerDB != null) {
            customerDB.setLast_update(new Timestamp(System.currentTimeMillis())); //Update the lastUpdate  to this date-time.
            customer = customerDB; //if customer already exists, just save the cart and updated customer lastUpdate
            customer.add(cart);
        } else //else if the customer is new then, save the new customer and add the cart.
        {
            // Save the customer first
            customer = customerRepository.save(customer);
            customer.add(cart);
        }

        // Populate the cart with the customer's address
        Address address = purchase.getAddress();
        if (address != null) {
            // Save the address first
            address = addressRepository.save(address);
            cart.setAddress(address);
        }

        //set cart status to ordered
        cart.setStatus(StatusType.ordered);

        // Save the cart
        cart = cartRepository.save(cart);

        // Fill the cart with cartItems
        Set<CartItemItem> cartItemItems = purchase.getCartItemItems();
        if (cartItemItems != null) {
            for (CartItemItem cartItemItem : cartItemItems) {
                // Set the association to the cart
                cartItemItem.setCart(cart);
                // Save each cart item
                cartItemRepository.save(cartItemItem);
            }
            // Set cart items in the cart
            cart.setCartItemItems(cartItemItems);
        }

        // Update the saved cart with its items
        cart = cartRepository.save(cart);


        // Populate the customer with the cart
//        Customer customer = purchase.getCustomer();
//        if (customer != null) {
//            // Check if customer already exists
//            Customer existingCustomerEmail = customerService.checkExistingCustomerEmail(customer.getEmail());
//            //Customer existingCustomerNames = customerService.checkExistingCustomerByNames(customer.getFirstName(), customer.getLastName());
//            if (existingCustomerEmail != null //&& existingCustomerNames != null
//            ) {
//                //@TODO Update the logic to prompt the customer to update their email or names if either exists and the other has changed.
//                // If customer exists, update last_update timestamp
//                customerService.updateLastUpdate(existingCustomerEmail);
//                customer = existingCustomerEmail;
//            } else {
//                // If customer does not exist, save the new customer
//                customer = customerService.save(customer);
//            }
//            // Associate the cart with the customer
//            customer.add(cart);
//        }
//
//        // Populate the cart with the customer's address
//        Address address = purchase.getAddress();
//        if (address != null) {
//            // Save the address first
//            address = addressRepository.save(address);
//            cart.setAddress(address);
//        }
//
//        // Save the cart
//        cart = cartRepository.save(cart);
//
//        // Fill the cart with cartItems
//        Set<CartItem> cartItems = purchase.getCartItems();
//        if (cartItems != null) {
//            for (CartItem cartItem : cartItems) {
//                // Set the association to the cart
//                cartItem.setCart(cart);
//                // Save each cart item
//                cartItemRepository.save(cartItem);
//            }
//            // Set cart items in the cart
//            cart.setCartItems(cartItems);
//        }
//
//        // Update the saved cart with its items
//        cart = cartRepository.save(cart);
//

        return purchaseResponse;
    }


    private String generateTrackingNumber() {
        // Generate a tracking number logic here
        return "SIMPLE--" + UUID.randomUUID().toString();
    }
}
