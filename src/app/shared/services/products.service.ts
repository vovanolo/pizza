import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string;
  // http://localhost:3000/products
  private products: Array<IProduct> = [
    {
      id: 1,
      category: 'pizza',
      name: 'Paperoni',
      description: 'paper, cheese',
      price: 156,
      date: new Date()
    },
    {
      id: 2,
      category: 'pizza',
      name: 'Cesario',
      description: 'tomato, cheese, salad, egg, soul cesar',
      price: 182,
      date: new Date()
    }
  ];
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }

  getJsonProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }

  setJsonProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, product);
  }

  deleteJsonProducts(id: number): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.url}/${id}`);
  }

  updateJsonProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.url}/${product.id}`, product);
  }
  getJsonOneProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }





  getProducts(): Array<IProduct> {
    return this.products;
  }

  setProducts(product: IProduct): void {
    this.products.push(product);
  }

  deleteProducts(id: number): void {
    const index = this.products.findIndex(prod => prod.id === id);
    this.products.splice(index, 1);
  }

  updateProducts(product: IProduct): void {
    const index = this.products.findIndex(prod => prod.id === product.id);
    this.products.splice(index, 1, product);
  }
}
