import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<IProduct> = [];

  constructor(private productsService: ProductsService) {
    this.getProducts();
   }

  ngOnInit() {
  }
  private getProducts(): void {
    this.productsService.getJsonProducts().subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  // getPageProducts(): void {
  //   this.products = this.productsService.getProducts();
  // }

}
