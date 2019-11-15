import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products'
})
export class ProductsPipe implements PipeTransform {

  transform(price: number, currency: string): any {
    if (!currency) { return price; }
    return `${price} ${currency}`;
  }

}
