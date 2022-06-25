import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customDateFilter'
})
export class SearchDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      let rVal = (val.attendance_date.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}