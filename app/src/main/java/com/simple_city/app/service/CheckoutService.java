package com.simple_city.app.service;

import com.simple_city.app.dto.Purchase;
import com.simple_city.app.dto.PurchaseResponse;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface CheckoutService {


    PurchaseResponse placeOrder(Purchase purchase);
}
