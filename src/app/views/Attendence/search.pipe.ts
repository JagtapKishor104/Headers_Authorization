import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      let rVal = (val.emp_id.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}