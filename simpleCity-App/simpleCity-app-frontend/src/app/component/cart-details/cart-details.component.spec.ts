import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDetailsComponent } from './cart-details.component';


describe('CartDetailsComponent', () => {
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// describe('CartDetailsComponent', () => {
//   let component: CartDetailsComponent;
//   let fixture: ComponentFixture<CartDetailsComponent>;
//   let mockCartService: jasmine.SpyObj<CartService>;

//   beforeEach(async () => {
//     mockCartService = jasmine.createSpyObj('CartService', ['calculateCartTotals']);
//     mockCartService.cartItems = [
//       { id: 1, name: 'Product 1', imageUrl: 'product1.jpg', unitPrice: 10, quantity: 2 },
//       { id: 2, name: 'Product 2', imageUrl: 'product2.jpg', unitPrice: 15, quantity: 3 }
//     ];
//     mockCartService.totalPrice = of(70);
//     mockCartService.totalQty = of(5);

//     await TestBed.configureTestingModule({
//       declarations: [ CartDetailsComponent ],
//       providers: [
//         { provide: CartService, useValue: mockCartService }
//       ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CartDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should display cart items with correct total price and total quantity', () => {
//     const compiled = fixture.nativeElement;
//     const cartItemElements = compiled.querySelectorAll('.cart-item');

//     expect(cartItemElements.length).toBe(2);

//     expect(compiled.querySelector('.total-price').textContent).toContain('Total Price: $70');
//     expect(compiled.querySelector('.total-qty').textContent).toContain('Total Quantity: 5');

//     const firstCartItem = cartItemElements[0];
//     expect(firstCartItem.querySelector('.item-name').textContent).toContain('Product 1');
//     expect(firstCartItem.querySelector('.item-quantity').textContent).toContain('Quantity: 2');
//     expect(firstCartItem.querySelector('.item-price').textContent).toContain('Price: $20');

//     const secondCartItem = cartItemElements[1];
//     expect(secondCartItem.querySelector('.item-name').textContent).toContain('Product 2');
//     expect(secondCartItem.querySelector('.item-quantity').textContent).toContain('Quantity: 3');
//     expect(secondCartItem.querySelector('.item-price').textContent).toContain('Price: $45');
//   });
// });