import { Address } from "./address";
import { Cart } from "./cart";
import { CartItemItem } from "./cart-item-item";
import { Customer } from "./customer";

export class Purchase {
    customer!: Customer;
    address!: Address;
    cart!: Cart;
    cartItemItems!: CartItemItem[];
}
