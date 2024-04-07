package com.simple_city.app.dto;

import lombok.Data;
import lombok.NonNull;

@Data
public class PurchaseResponse {

    @NonNull
    private String orderTrackingNumber;

    public PurchaseResponse(@NonNull String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }
}
