import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'ffgbsy-sales-volumne',
  templateUrl: './sales-volumne.page.html',
  styleUrls: ['./sales-volumne.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SalesVolumnePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
