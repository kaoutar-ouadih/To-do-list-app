import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],filterString : string, isCompleted : boolean):any[] {
    let result ;
     value.forEach((elt)=>{
      if(filterString == "completed"){
        result = value.filter((item)=>{
          return item.isCompleted;
        });
      }
      else if(filterString == "not completed") {
        result = value.filter((item)=>{
          return !item.isCompleted;
        });
      }else {
        result = value;
      }
    })
    return result;
  }

}
