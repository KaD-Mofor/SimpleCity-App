import { Injectable, OnInit, numberAttribute } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQty: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(iCartItem: CartItem) {
    // Find the item in the cart
    const existingInCartItem = this.cartItems.find(ci => ci.id === iCartItem.id);

    // Check if the item already exists in the cart
    const alreadyExistsInCart = !!existingInCartItem;

    if (alreadyExistsInCart) {
      // Increment the quantity if the item already exists
      if (existingInCartItem) {
        existingInCartItem.quantity++;
      }
    } else {
      // Otherwise, add the item to the cart
      this.cartItems.push(iCartItem);
    }

    // Calculate and update the cart totals
    this.calculateCartTotals();
  }

  calculateCartTotals() {
    let totalPriceValue: number =0;
    let totalQtyV: number =0;

    for (let currentCI of this.cartItems) {
      totalPriceValue += currentCI.quantity * currentCI.unitPrice;
      totalQtyV += currentCI.quantity;
    }

    //push out the new values
    this.totalPrice.next(totalPriceValue);
    this.totalQty.next(totalQtyV);

    //Debug cart values
    this.cartLog(totalPriceValue, totalQtyV); 
  }
  cartLog(totalPriceValue: number, totalQtyV: number) {
    console.log('Cart status');
    for (let ci of this.cartItems) {
      const runningTotal = ci.quantity * ci.unitPrice;
      console.log(`name: ${ci.name}, qty=${ci.quantity}, 
                  unitPrice=${ci.unitPrice}, runningTotal=${runningTotal}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQty: ${totalQtyV}`);
    console.log("     *********     ");
  }
}
