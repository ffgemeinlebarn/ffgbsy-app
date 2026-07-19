export const displayEuroNumber = (value: any, symbol: string = '€', zerotext: boolean = true) => {
    const parsedValue = parseFloat(value);

    if (parsedValue == 0 && zerotext) {
        return 'kostenlos';
    }

    const fixedValue = String(parsedValue.toFixed(2)).replace('.', ',');

    return symbol.length > 0 ? `${symbol} ${fixedValue}` : fixedValue;
};
