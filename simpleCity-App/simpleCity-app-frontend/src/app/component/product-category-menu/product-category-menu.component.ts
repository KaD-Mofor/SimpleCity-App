import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService){ }

  ngOnInit(){
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe({
      next: (data: ProductCategory[]) => {
        console.log('Product Categories=' +JSON.stringify(data));
        this.productCategories = data;
      },
      error: (error: any) => {
        console.error('Error fetching product categories:', error);
      }
    });
  }
  
}
