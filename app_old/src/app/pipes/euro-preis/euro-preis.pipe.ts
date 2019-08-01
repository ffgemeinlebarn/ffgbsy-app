import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euroPreis'
})
export class EuroPreisPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!args) args = {symbol: true, zerotext: true};

    let p = parseFloat(value);
    let symbol = "";
    if (args.symbol === true) symbol = "€ ";

    if (p != 0 || args.zerotext == false){
      let str: string = String(p.toFixed(2));
      str = str.replace(".", ",");
  
      return symbol + str;
    }else{
      return "kostenlos";
    }
  }

}
