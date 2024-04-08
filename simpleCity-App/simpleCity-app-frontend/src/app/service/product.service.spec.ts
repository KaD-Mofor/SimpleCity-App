import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { ProductCategory } from '../common/product-category';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve product categories', () => {
    const mockCategories: ProductCategory[] = [
      { id: 1, categoryName: 'Category 1' },
      { id: 2, categoryName: 'Category 2' }
    ];

    service.getProductCategories().subscribe(categories => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(mockCategories);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/product-category');
    expect(req.request.method).toEqual('GET');
    req.flush({ _embedded: { productCategory: mockCategories } });
  });

  
});
