import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eigenschaftenChangedToOhne'
})
export class EigenschaftenChangedToOhnePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let eigenschaften: Array<string> = [];

    for (let e of value){

      if (e.in_produkt_enthalten == 1 && e.aktiv == 0){
        if (parseFloat(e.preis) != 0){
          eigenschaften.push(e.name + " (€ " + e.preis + ")");
        }else{
          eigenschaften.push(e.name);
        }
      }
    }

    if (eigenschaften.length > 0) return "MIT: " + eigenschaften.join (", ");
    return "";
    
  }

}
