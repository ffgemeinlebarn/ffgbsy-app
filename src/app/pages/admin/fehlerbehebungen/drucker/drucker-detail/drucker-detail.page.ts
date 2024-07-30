import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'ffgbsy-drucker-detail',
  templateUrl: './drucker-detail.page.html',
  styleUrls: ['./drucker-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DruckerDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
