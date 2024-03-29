import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    // Set totalQuantity and totalPrice of the Cart object
    purchase.cart.totalQuantity = purchase.cartItemItems.reduce((acc, ci) => acc + ci.quantity, 0);
    purchase.cart.totalPrice = purchase.cartItemItems.reduce((acc, ci) => acc + ci.quantity * ci.unitPrice, 0);
    
    console.log(`Total Price: ${purchase.cart.totalPrice.toFixed(2)}, Total Qty: ${purchase.cart.totalQuantity}`);
    console.log("     *********     ");
  

    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

}
