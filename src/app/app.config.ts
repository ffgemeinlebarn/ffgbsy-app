import { CommonModule } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './app.routes';
import { apiErrorInterceptor } from './misc/api-error-handling.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy,
        },
        importProvidersFrom(IonicStorageModule.forRoot({})),
        importProvidersFrom(FormsModule),
        importProvidersFrom(CommonModule),
        provideCharts(withDefaultRegisterables()),
        provideIonicAngular(),
        provideHttpClient(withFetch(), withInterceptors([apiErrorInterceptor])),
        provideRouter(routes, withComponentInputBinding()),
    ],
};
