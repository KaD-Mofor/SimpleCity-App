import { Injectable, OnInit, numberAttribute } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  storage : Storage = sessionStorage;

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQty: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { 
    //read data from session storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    //calculate cart total based on stored data
    if(data != null) {
      this.cartItems = data;
      this.calculateCartTotals();
    }
  }

  //Session storage
  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

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
    this.calculateCartTotals();
  }
    // Calculate and update the cart totals
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
    //Retrieve cart items in session storage
    this.persistCartItems();
  }

  decrementQty(t: CartItem) {
    t.quantity--;

    if (t.quantity === 0){
      this.remove(t);
    } else{
      this.calculateCartTotals();
    }
  }

  remove(t: CartItem) {
    const itemIndex = this.cartItems.findIndex(i => i.id == t.id)
    
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.calculateCartTotals();
    }
  }

  cartLog(totalPriceValue: number, totalQtyV: number) {
    console.log('Cart status'); //debugging
    for (let ci of this.cartItems) {
      const runningTotal = ci.quantity * ci.unitPrice;
      console.log(`name: ${ci.name}, qty=${ci.quantity}, 
                  unitPrice=${ci.unitPrice}, runningTotal=${runningTotal}`); //debugging
    }

    //debugging
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQty: ${totalQtyV}`);
    console.log("     *********     ");
  }
}
