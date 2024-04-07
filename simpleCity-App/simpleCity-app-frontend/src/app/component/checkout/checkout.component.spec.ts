import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../service/cart.service';
import { CheckoutService } from '../../service/checkout.service';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockCartService: Partial<CartService>;
  let mockCheckoutService: Partial<CheckoutService>;

  beforeEach(async () => {
    mockCartService = {
      totalQty: new BehaviorSubject<number>(5), // Initialize as BehaviorSubject
      totalPrice: new BehaviorSubject<number>(70), // Initialize as BehaviorSubject
      cartItems: [] // add mock data here if needed
    };

    mockCheckoutService = {
      placeOrder: jasmine.createSpy('placeOrder')
    };

    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: CheckoutService, useValue: mockCheckoutService }
      ]
    }).compileComponents();
  });

  // Remaining test setup...
});
