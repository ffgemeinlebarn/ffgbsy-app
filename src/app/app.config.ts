import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideHttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        importProvidersFrom(IonicModule.forRoot({})),
        importProvidersFrom(IonicStorageModule.forRoot({})),
        importProvidersFrom(FormsModule),
        importProvidersFrom(CommonModule),
        provideIonicAngular(),
        provideHttpClient(),
        provideRouter(routes),
    ],
};