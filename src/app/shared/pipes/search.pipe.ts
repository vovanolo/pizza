import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: Array<any>, searchText: string): any {
    if (!searchText) return arr;
    if (!arr) return [];
    return arr.filter(prod => prod.name.toLowerCase().indexOf(searchText.toLowerCase()) != -1)
  }

}
