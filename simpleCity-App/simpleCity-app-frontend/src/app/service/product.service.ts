import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    //build URL based on catergory id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]>  {
    //build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }
  
  getSearchProductPagination(p: number, 
    pSize: number, 
    theKeyword: string): Observable<GetResponseProducts> {

//build URL based on catergory id and page data
const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
+ `&page=${p}&size=${pSize}`;

return this.httpClient.get<GetResponseProducts>(searchUrl);
}

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(productId: number): Observable<Product> {
    //build URL based on product id
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPagination(p: number, 
                          pSize: number, 
                          theCategoryId: number): Observable<GetResponseProducts> {

    //build URL based on catergory id and page data
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
          + `&page=${p}&size=${pSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
}

//Grab data from REST api and unwrap it to make it available as an array of products
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  //pagination code
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
