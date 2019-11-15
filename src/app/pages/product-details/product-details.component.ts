import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {ActivatedRoute} from '@angular/router';
import {IProduct} from '../../shared/interfaces/product.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  productId: number;
  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private location: Location) {
    this.getMyProduct();
  }

  ngOnInit() {
  }

  private getMyProduct(): void {
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.productsService.getJsonOneProduct(this.productId).subscribe(
      data => {
        this.product = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  goBack(): void {
    this.location.back();
  }

}
