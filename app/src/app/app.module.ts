import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from  '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PipesModule } from './pipes/pipes/pipes.module';
import { BestellungspositionEditModalPageModule } from './modals/bestellungsposition-edit-modal/bestellungsposition-edit-modal.module';
import { BestellungKontrollePageModule } from './modals/bestellung-kontrolle/bestellung-kontrolle.module';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  entryComponents: [
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    BestellungspositionEditModalPageModule,
    BestellungKontrollePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
  ],
})
export class AppModule {}