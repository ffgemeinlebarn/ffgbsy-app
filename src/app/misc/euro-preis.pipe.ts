import { Pipe, PipeTransform } from '@angular/core';
import { displayEuroNumber } from './euro-preis.helper';

@Pipe({
    name: 'euroPreis',
    standalone: true,
})
export class EuroPreisPipe implements PipeTransform {
    transform(value: any, args?: any): string {
        if (args === undefined) args = {};
        if (args?.symbol === undefined) args.symbol = '€';
        if (args?.zerotext === undefined) args.zerotext = true;

        return displayEuroNumber(value, args.symbol, args.zerotext);
    }
}
