import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'ffgbsy-drucker-list',
  templateUrl: './drucker-list.page.html',
  styleUrls: ['./drucker-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DruckerListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
