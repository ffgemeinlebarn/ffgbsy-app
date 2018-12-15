import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any) {

    if (value === true){
      return "Ja";
    }else if(value === false){
      return "Nein";
    }else{
      return "Wird ermittelt";
    }
  }

}
