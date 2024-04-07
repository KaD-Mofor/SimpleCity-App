import { timestamp } from 'rxjs';
import { CartItem } from './cart-item';
import { Product } from './product';

// describe('CartItem', () => {
//   it('should create an instance', () => {
//     expect(new CartItem()).toBeTruthy();
//   });
// });

describe('CartItem', () => {
  it('should create an instance', () => {
    // Create a mock Product object
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      imageUrl: 'test-image-url',
      unitPrice: 10.99,
      sku: '',
      description: '',
      active: false,
      unitsInStock: 0,
      dateCreated: new Date,
      lastUpdated: new Date
    };

    // Create a CartItem instance with the mock Product object
    const cartItem = new CartItem(mockProduct);

    // Assert that the cartItem instance is truthy (i.e., it was created successfully)
    expect(cartItem).toBeTruthy();
  });
});
