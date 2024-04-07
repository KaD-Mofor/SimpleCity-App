import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    // Provide sample values for all properties of Product
    const id = 1;
    const sku = 'sample-sku';
    const name = 'Sample Product';
    const description = 'Sample description';
    const unitPrice = 10.99;
    const imageUrl = 'sample-image-url';
    const active = true;
    const unitsInStock = 10;
    const dateCreated = new Date(); // Provide an actual date value
    const lastUpdated = new Date(); // Provide an actual date value

    // Create a new instance of Product with the provided arguments
    const product = new Product(id, sku, name, description, unitPrice, imageUrl, active, unitsInStock, dateCreated, lastUpdated);

    // Assert that the product instance is truthy (i.e., it was created successfully)
    expect(product).toBeTruthy();
  });
});
