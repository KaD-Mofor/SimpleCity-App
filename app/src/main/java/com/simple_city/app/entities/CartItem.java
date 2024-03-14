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
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cart_items")
@CrossOrigin(origins = "http://localhost:4200")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private Long id;

    @Column(name = "create_date")
    private Timestamp createDate;

    @Column(name = "last_update")
    private Timestamp lastUpdate;

   // @ManyToOne(fetch = FetchType.LAZY)
   // @JoinColumn(name = "product_id")
   // private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    public void setCustomer(Customer savedCustomer) {
    }
}


