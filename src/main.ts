import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AppRoutingModule } from './app/app-routing.module';
import { timerMainDashboardReducer } from '@containers/timer-main-dashboard/store/reducers/timer-main-dashboard.reducer';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const ngrxModules = [
  StoreModule.forRoot({
    timerMainDashboard: timerMainDashboardReducer
  }),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({
    name: 'Trackifier',
    maxAge: 50
  })
];

const firebaseModules = [
  provideFirebaseApp(() => initializeApp({
    "projectId": "trackifier",
    "appId": "1:231128310965:web:e65a10ed747030bd4b4afc",
    "storageBucket": "trackifier.appspot.com",
    "apiKey": "AIzaSyBW4-TBUDUqreS52SmVh_h9y7xVf_LRUHk",
    "authDomain": "trackifier.firebaseapp.com",
    "messagingSenderId": "231128310965"
  })),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideFunctions(() => getFunctions())
];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
          BrowserModule,
          AppRoutingModule,
          ...ngrxModules,
          ...firebaseModules
        ),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ],
})
  .catch(err => console.error(err));
