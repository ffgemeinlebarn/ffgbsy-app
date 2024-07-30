import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'ffgbsy-product-sales',
  templateUrl: './product-sales.page.html',
  styleUrls: ['./product-sales.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProductSalesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
