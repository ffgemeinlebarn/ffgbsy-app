import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        importProvidersFrom(IonicStorageModule.forRoot({})),
        importProvidersFrom(FormsModule),
        importProvidersFrom(CommonModule),
        provideCharts(withDefaultRegisterables()),
        provideIonicAngular(),
        provideHttpClient(),
        provideRouter(routes, withComponentInputBinding()),
    ],
};
