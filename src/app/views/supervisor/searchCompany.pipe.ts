import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'SearchCompanyPipe'
})
export class SearchCompanyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      let rVal = (val.id.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}