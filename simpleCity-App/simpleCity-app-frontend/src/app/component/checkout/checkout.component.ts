import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup!: FormGroup;
  // totalPrice: number = 0;
  // totalQty: number = 0;
  // shipping: number = this.totalPrice * 0.05;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator]),
        email: new FormControl('', 
                [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), this.noWhitespaceValidator]),
        phone: new FormControl('', [Validators.pattern('^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$')])
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

    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log("Submit button: ");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('shippingAddress')?.value);
  }

  get customerFirstName() {return this.checkoutFormGroup.get('customer.firstName')};
  get customerLastName() {return this.checkoutFormGroup.get('customer.lastName')};
  get customerEmail() {return this.checkoutFormGroup.get('customer.email')};
  get customerPhone() {return this.checkoutFormGroup.get('customer.phone')};

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
