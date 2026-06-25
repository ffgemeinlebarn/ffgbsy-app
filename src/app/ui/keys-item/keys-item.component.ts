import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { EuroPreisPipe } from '../../misc/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-keys-item',
    templateUrl: './keys-item.component.html',
    styleUrls: ['./keys-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, EuroPreisPipe],
})
export class KeysItemComponent {
    public label = input('');
    public keys = input(null);
}
