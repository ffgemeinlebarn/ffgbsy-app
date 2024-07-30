import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorGeneratorService {

    private colors = [
        '#003f9a', '#d8e616', '#769d77', '#225097', '#c2d83c', '#658e80', '#356092', '#adca51', '#456f8d', '#87ac6d', '#557f87', '#99bb60'
    ];

    public getRgba(index: number, alpha = 1) {
        if (index >= this.colors.length) {
            return `rgba(0, 0, 0, ${alpha})`;
        }

        const rgb = this.hexToRgbNumbers(this.colors[index]);

        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    }

    public getHex(index: number) {
        if (index >= this.colors.length) {
            return `#000000`;
        }

        return this.colors[index];
    }

    private hexToRgbNumbers(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


    // private foreground = [
    //     'rgb(136, 17, 17)',
    //     'rgb(0, 0, 153)',
    //     'rgb(179, 179, 0)',
    //     'rgb(0, 102, 34)'
    // ];

    // private background = [
    //     'rgba(204, 25, 25, 0.3)',
    //     'rgba(51, 51, 255, 0.3)',
    //     'rgba(255, 255, 102, 0.3)',
    //     'rgba(0, 204, 68, 0.3)'
    // ];

    // private backup = [];


    // public getForegroundColor(index: number) {
    //     if (index < this.foreground.length) {
    //         return this.foreground[index];
    //     } else if (index < this.backup.length) {
    //         return this.backup[index - this.foreground.length];
    //     } else {
    //         return 'rgb(0, 0, 0)';
    //     }
    // }

    // public getBackgroundColor(index: number) {
    //     if (index < this.background.length) {
    //         return this.background[index];
    //     } else if (index < this.backup.length) {
    //         return this.backup[index - this.background.length];
    //     } else {
    //         return 'rgba(0, 0, 0, 0.3)';
    //     }
    // }

}

