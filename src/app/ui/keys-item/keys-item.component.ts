import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EuroPreisPipe } from '../../misc/euro-preis.pipe';
import { TileComponent } from '../tile/tile.component';

@Component({
    selector: 'ffgbsy-keys-item',
    templateUrl: './keys-item.component.html',
    styleUrls: ['./keys-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [EuroPreisPipe, TileComponent],
})
export class KeysItemComponent {
    public label = input('');
    public keys = input(null);
}
