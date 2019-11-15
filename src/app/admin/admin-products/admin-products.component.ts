import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/classes/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  adminProducts: Array<IProduct> = [];
  productCategory: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productId: number;
  editStatus: boolean;

  constructor(private productsService: ProductsService) {
    // this.getAdminProducts();
    this.getProducts();
  }

  ngOnInit() {
  }

  private getProducts(): void {
    this.productsService.getJsonProducts().subscribe(
      data => {
        this.adminProducts = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  // getAdminProducts(): void {
  //   this.adminProducts = this.productsService.getProducts();
  // }


  addProduct(): void {
    const newP: IProduct = new Product(1,
      this.productCategory,
      this.productName,
      this.productDescription,
      this.productPrice);
    if (this.adminProducts.length > 0) {
      newP.id = this.adminProducts.slice(-1)[0].id + 1;
    }

    if (this.editStatus) {
      newP.id = this.productId;
      this.productsService.updateJsonProducts(newP).subscribe(() => {
        this.getProducts();
      });
      this.editStatus = false;
    } else {
      this.productsService.setJsonProducts(newP).subscribe(() => {
        this.getProducts();
      });
    }

    this.clearForm();
  }

  deleteProduct(product: IProduct): void {
    this.productsService.deleteJsonProducts(product.id).subscribe(() => {
      this.getProducts();
    });
  }

  editProduct(product: IProduct): void {
    this.productCategory = product.category;
    this.productName = product.name;
    this.productDescription = product.description;
    this.productPrice = product.price;
    this.productId = product.id;
    this.editStatus = true;
  }



  // addAdminProduct(): void {
  //   const newP: IProduct = new Product(1,
  //     this.productCategory,
  //     this.productName,
  //     this.productDescription,
  //     this.productPrice);
  //   if (this.adminProducts.length > 0) {
  //     newP.id = this.adminProducts.slice(-1)[0].id + 1;
  //   }
  //   if (this.editStatus) {
  //     newP.id = this.productId;
  //     this.productsService.updateProducts(newP);
  //     this.editStatus = false;
  //   }
  //   else {
  //     this.productsService.setProducts(newP);
  //   }
  //   this.clearForm();
  // }

  // deleteAdminProduct(product: IProduct): void {
  //   this.productsService.deleteProducts(product.id);
  // }

  // editAdminProduct(product: IProduct): void {
  //   this.productCategory = product.category;
  //   this.productName = product.name;
  //   this.productDescription = product.description;
  //   this.productPrice = product.price;
  //   this.productId = product.id;
  //   this.editStatus = true;
  // }

  private clearForm(): void {
    this.productCategory = '';
    this.productName = '';
    this.productDescription = '';
    this.productPrice = null;
  }

}
