package com.simple_city.app.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Table(name = "cart_items")
@CrossOrigin(origins = "http://localhost:4200")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "unit_price")
    private int unitPrice;

//    @ManyToOne
//    @JoinColumn(name = "product_id", nullable = false)
//    private Product product;
    @Column(name = "product_id")   //@TODO check if product id is cast as a different type in the project
    private Long productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    public void setCustomer(Customer savedCustomer) {
    }
}


