import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kachelwand',
  templateUrl: './kachelwand.component.html',
  styleUrls: ['./kachelwand.component.scss']
})
export class KachelwandComponent implements OnInit {

  constructor() { }

  @Input() array: Array<any>;

  ngOnInit() {
  }

}
