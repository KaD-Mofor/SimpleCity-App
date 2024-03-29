import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { CheckoutService } from '../../service/checkout.service';
import { Router } from '@angular/router';
import { Cart } from '../../common/cart';
import { CartItemItem } from '../../common/cart-item-item';
import { Purchase } from '../../common/purchase';
import { State } from '@popperjs/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup!: FormGroup;
  totalPrice!: number;
  totalQty!: number;

  constructor(private formBuilder: FormBuilder, 
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router){}

  ngOnInit(): void {
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator, Validators.pattern("[a-zA-Z-' ]*")]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator, Validators.pattern("[a-zA-Z-' ]*")]),
        email: new FormControl('', 
                [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), this.noWhitespaceValidator]),
        phone: new FormControl('', [Validators.required, Validators.pattern('^\\(?([0-9]{3})\\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$'), this.noWhitespaceValidator])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(5), this.noWhitespaceValidator]),
        city: new FormControl('', [Validators.required, Validators.minLength(5), this.noWhitespaceValidator, Validators.pattern("[a-zA-Z-' ]*")]),
        state: new FormControl('', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator, Validators.pattern("[a-zA-Z-' ]*")]),
        country: new FormControl('', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator, Validators.pattern("[a-zA-Z-' ]*")]),
        zipCode: new FormControl('', [Validators.required, Validators.pattern('^\\d{5}$'), this.noWhitespaceValidator])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(5), this.noWhitespaceValidator]),
        city: new FormControl('', [Validators.required, Validators.minLength(5), this.noWhitespaceValidator, Validators.pattern("[a-zA-Z-' ]*")]),
        state: new FormControl('', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator, Validators.pattern("[a-zA-Z-' ]*")]),
        country: new FormControl('', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator, Validators.pattern("[a-zA-Z-' ]*")]),
        zipCode: new FormControl('', [Validators.required, Validators.pattern('^\\d{5}$'), this.noWhitespaceValidator])
      }),
      creditCard: this.formBuilder.group({
        cType: new FormControl('', [Validators.required]),        
        cName: new FormControl('', [Validators.required, Validators.minLength(5), this.noWhitespaceValidator, Validators.pattern("[a-zA-Z-' ]*")]),
        cNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$'), this.noWhitespaceValidator]),
        cCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$'), this.noWhitespaceValidator]),
        expMonth: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}$'), this.noWhitespaceValidator]),
        expYear: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$'), this.noWhitespaceValidator]),
      })
    });

    this.reviewCartTotals();
    
  }

  reviewCartTotals() {
    this.cartService.totalQty.subscribe(
      totalQty => this.totalQty = totalQty
    );
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  onSubmit(){

    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    console.log("Submit button: ");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('shippingAddress')?.value);

    //set up cart
    let order = new Cart();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQty;

    //get cart items
    const cartItems = this.cartService.cartItems;

    //create orderitems from cartItems
        //older method
    let orderItems: CartItemItem[] = [];
    for (let i = 0; i < cartItems.length; i++) {
      const { imageUrl, quantity, unitPrice, id } = cartItems[i];
      orderItems.push(new CartItemItem(imageUrl, quantity, unitPrice, id.toString()));
    }

        //new method
    // let orderItems: CartItemItem[] = cartItems.map(i => new CartItemItem(i));

    //set up purcahse
    let purchase = new Purchase();

    //populate customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    //populate address
    purchase.address = this.checkoutFormGroup.controls['shippingAddress'].value;

    //populate cart/order and orderItems/cartItems
    purchase.cart = order;
    purchase.cartItemItems = orderItems;

    //call the REST API by checkoutService
    this.checkoutService.placeOrder(purchase).subscribe({ 
        next: response => {
          alert(`Your order has been received. \nYour Order tracking number is ${response.orderTrackingNumber}`);

          //reset cart
          this.resetCart();

        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );

  }

  resetCart() {
    //reset cart data
    this.cartService.cartItems =[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQty.next(0);
    //reset form
    this.checkoutFormGroup.reset();

    //go back to products page
    this.router.navigateByUrl("/products");

  }

  get customerFirstName() {return this.checkoutFormGroup.get('customer.firstName')};
  get customerLastName() {return this.checkoutFormGroup.get('customer.lastName')};
  get customerEmail() {return this.checkoutFormGroup.get('customer.email')};
  get customerPhone() {return this.checkoutFormGroup.get('customer.phone')};

  get street() {return this.checkoutFormGroup.get('shippingAddress.street')};
  get city() {return this.checkoutFormGroup.get('shippingAddress.city')};
  get state() {return this.checkoutFormGroup.get('shippingAddress.state')};
  get country() {return this.checkoutFormGroup.get('shippingAddress.country')};
  get zipCode() {return this.checkoutFormGroup.get('shippingAddress.zipCode')};

  get bstreet() {return this.checkoutFormGroup.get('billingAddress.street')};
  get bcity() {return this.checkoutFormGroup.get('billingAddress.city')};
  get bstate() {return this.checkoutFormGroup.get('billingAddress.state')};
  get bcountry() {return this.checkoutFormGroup.get('billingAddress.country')};
  get bzipCode() {return this.checkoutFormGroup.get('billingAddress.zipCode')};

  get cType() {return this.checkoutFormGroup.get('creditCard.cType')};
  get cName() {return this.checkoutFormGroup.get('creditCard.cName')};
  get cNumber() {return this.checkoutFormGroup.get('creditCard.cNumber')};
  get cCode() {return this.checkoutFormGroup.get('creditCard.cCode')};
  get expMonth() {return this.checkoutFormGroup.get('creditCard.expMonth')};
  get expYear() {return this.checkoutFormGroup.get('creditCard.expYear')};

  sameAsShoppingAddress(event: Event): void {
    const mouseEvent = event as MouseEvent;
    if (mouseEvent.target instanceof HTMLInputElement && mouseEvent.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }
  // Custom validator to check for whitespace
  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  }
}
