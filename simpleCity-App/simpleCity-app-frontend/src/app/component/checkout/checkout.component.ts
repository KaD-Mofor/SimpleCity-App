import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQty: number = 0;
  shipping: number = this.totalPrice * 0.05;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        phone: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cType: [''],
        cName: [''],
        cNumber: [''],
        cCode: [''],
        expMonth: [''],
        expYear: ['']
      })
    });
  }

  onSubmit(){
    console.log("Submit button: ");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('shippingAddress')?.value);
  }

  sameAsShoppingAddress(event: Event): void {
    const mouseEvent = event as MouseEvent;
    if (mouseEvent.target instanceof HTMLInputElement && mouseEvent.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

}
