import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ffgbsy-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [],
})
export class TileComponent {
    public title = input.required<string>();
    public subtitle = input.required<string>();
}
