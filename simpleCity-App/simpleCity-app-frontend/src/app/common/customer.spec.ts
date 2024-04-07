import { Customer } from './customer';

// describe('Customer', () => {
//   it('should create an instance', () => {
//     expect(new Customer()).toBeTruthy();
//   });
// });

describe('Customer', () => {
  it('should create an instance', () => {
    // Provide sample values for firstName, lastName, and email
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';

    // Create a new instance of Customer with the provided arguments
    const customer = new Customer(firstName, lastName, email);

    // Assert that the customer instance is truthy (i.e., it was created successfully)
    expect(customer).toBeTruthy();
  });
});
