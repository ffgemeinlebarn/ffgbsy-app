import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Meine Services
import { DataService } from './services/data/data.service';
import { SessionService } from './services/session/session.service';
import { SettingsService } from './services/settings/settings.service';
import { BestellungenHandlerService } from './services/bestellungen/bestellungen-handler.service';

// Pipes
import { PipesModule } from './pipes/pipes.module';
import { FrontendService } from './services/frontend/frontend.service';

// Modals
import { BestellungKontrollePageModule } from './modals/bestellung-kontrolle/bestellung-kontrolle.module';
import { BestellungspositionEditModalPageModule } from './modals/bestellungsposition-edit-modal/bestellungsposition-edit-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataService,
    SessionService,
    SettingsService,
    BestellungenHandlerService,
    FrontendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
