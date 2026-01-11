import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ColorGeneratorService {
    private colors = ['#003f9a', '#d8e616', '#769d77', '#225097', '#c2d83c', '#658e80', '#356092', '#adca51', '#456f8d', '#87ac6d', '#557f87', '#99bb60'];

    public getRgba(index: number, alpha = 1) {
        if (index >= this.colors.length) {
            return `rgba(0, 0, 0, ${alpha})`;
        }

        const rgb = this.hexToRgbNumbers(this.colors[index]);

        return `rgba(${rgb?.r}, ${rgb?.g}, ${rgb?.b}, ${alpha})`;
    }

    public getHex(index: number) {
        if (index >= this.colors.length) {
            return `#000000`;
        }

        return this.colors[index];
    }

    private hexToRgbNumbers(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    }
}
