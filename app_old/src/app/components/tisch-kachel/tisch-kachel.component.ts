import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'tisch-kachel',
  templateUrl: './tisch-kachel.component.html',
  styleUrls: ['./tisch-kachel.component.scss']
})
export class TischKachelComponent implements OnInit {

  @Input() tisch: any;

  constructor() {
    
  }

  ngOnInit() {
    
  }

}