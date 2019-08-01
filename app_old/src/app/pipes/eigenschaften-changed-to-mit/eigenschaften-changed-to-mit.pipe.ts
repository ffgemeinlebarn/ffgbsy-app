import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eigenschaftenChangedToMit',
  pure: false
})
export class EigenschaftenChangedToMitPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let eigenschaften: Array<string> = [];

    for (let e of value){

      console.log("e", e.name, e.aktiv);

      if (e.in_produkt_enthalten == 0 && (e.aktiv == 1 || e.aktiv == true)){
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
