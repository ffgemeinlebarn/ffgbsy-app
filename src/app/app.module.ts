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
import { ModalsModule } from './modals/modals.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ComponentsModule } from './components/components.module';
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        LoggerModule.forRoot({
            serverLoggingUrl: `${environment.api}/logs`,
            serverLogLevel: NgxLoggerLevel.INFO,
            level: NgxLoggerLevel.DEBUG,
            context: "FFGBSY",
            disableFileDetails: true
        }),
        PipesModule,
        ModalsModule,
        ComponentsModule,
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
