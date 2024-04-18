import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CheckoutService } from './checkout.service';
import { Purchase } from '../common/purchase';
import { Address } from '../common/address';
import { Cart } from '../common/cart';
import { Customer } from '../common/customer';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckoutService]
    });
    service = TestBed.inject(CheckoutService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to place an order', () => {

    const mockCustomer: Customer = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890'
    };

    const mockAddress: Address = {
      street: '67 Easy',
      city: 'Gotham',
      state: 'CHI',
      country: 'USA',
      zipCode: '66778'
    };
    
    const mockCart: Cart = {
      totalQuantity: 8,
      totalPrice: 86.98
    };
    

    const mockPurchase: Purchase = {
      customer: mockCustomer,
      address: mockAddress,
      cart: mockCart,
      cartItemItems: []
    };

    service.placeOrder(mockPurchase).subscribe();

    const req = httpTestingController.expectOne('http://localhost:8080/api/checkout/purchase');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockPurchase);
    req.flush({}); // Mock response data as needed
  });


});
