import { CartItem } from "./cart-item";

export class CartItemItem {

    imageUrl: string;
    quantity: number;
    unitPrice: number;
    productId: number; //change number to string

    constructor(cartItem: CartItem) {
         this.imageUrl = cartItem.imageUrl;
         this.quantity = cartItem.quantity;
         this.unitPrice = cartItem.unitPrice;
         this.productId = cartItem.id;
    }

    // constructor(public imageUrl: string,
    //     public unitPrice: number,
    //     public quantity: number,
    //     public productId: string) { }
}
