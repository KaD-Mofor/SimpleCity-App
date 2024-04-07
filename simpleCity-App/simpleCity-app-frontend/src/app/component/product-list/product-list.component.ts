import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //Pagination
  pageNumber: number =1;
  pageSize: number = 4;  //Modify to desired number of products displayed per page
  totalElements: number =0;

  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts(); 
    }) 
  }

  handleListProducts() {
    // Check if the 'category_id' parameter is available
    const categoryIdParam = this.route.snapshot.paramMap.get("id")!;
    console.log(`CategoryId ====== , ${categoryIdParam}`)
  
    if (categoryIdParam) {
      // Get the category ID from the query parameters
      this.currentCategoryId = +categoryIdParam;
    } else {
      // Set default category ID
      this.currentCategoryId = 1;
    }
  
    // Reset pageNumber if previousCategory is different from currentCategory
    if (this.previousCategoryId !== this.currentCategoryId) {
      this.pageNumber = 1;
    }
  
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);
  
    // Note: Spring Data REST is 0-based, so pageNumber = -1,
    // but Angular is 1-based, so this.pageNumber = data.page.number + 1.
    this.productService.getProductListPagination(this.pageNumber - 1,
      this.pageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }
  

  updatePageSize(pageSize: string) {
    this.pageSize =+pageSize;
    this.pageNumber = 1
    this.listProducts();
  }

  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
    
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    //Reset page number to 1 if previous keyword is different
    if (this.previousKeyword != theKeyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, pageNumber=${this.pageNumber}`);

    //search using keyword
    this.productService.getSearchProductPagination(this.pageNumber -1,
                                                    this.pageSize,
                                                    theKeyword).subscribe(
                                                      this.processResult()
                                                    );
  }

  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number +1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
    }

  addToCart(product: Product) {
    console.log(`Addingto cart: ${product.name}, ${product.unitPrice}`);
    
    const iCartitem = new CartItem(product);

    this.cartService.addToCart(iCartitem);
  }

}
