import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'ffgbsy-failed-bons',
  templateUrl: './failed-bons.page.html',
  styleUrls: ['./failed-bons.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FailedBonsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
