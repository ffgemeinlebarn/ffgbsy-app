import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './services/data/data.service';
import { SettingsService } from './services/settings/settings.service';
import { BestellungenHandlerService } from './services/bestellungen/bestellungen-handler.service';
import { PipesModule } from './pipes/pipes.module';
import { FrontendService } from './services/frontend/frontend.service';
import { BestellungKontrollePageModule } from './modals/bestellung-kontrolle/bestellung-kontrolle.module';
import { BestellungspositionEditModalPageModule } from './modals/bestellungsposition-edit-modal/bestellungsposition-edit-modal.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
        BestellungKontrollePageModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        DataService,
        SettingsService,
        BestellungenHandlerService,
        FrontendService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
