/// <reference types="@angular/localize" />

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
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppRoutingModule } from './app/app-routing.module';
import { timerMainDashboardReducer } from '@app/timer-main-dashboard/store/reducers/timer-main-dashboard.reducer';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ProjectEffects } from '@app/projects/store/effects/project.effects';
import { projectReducer } from '@app/projects/store/reducers/project.reducer';

const ngrxModules = [
  StoreModule.forRoot({
    timerMainDashboard: timerMainDashboardReducer,
    project: projectReducer
  }),
  EffectsModule.forRoot([
    ProjectEffects
  ]),
  StoreDevtoolsModule.instrument({
    name: 'Trackifier',
    maxAge: 50
  })
];

const firebaseConfig = {
  "apiKey": "AIzaSyBW4-TBUDUqreS52SmVh_h9y7xVf_LRUHk",
  "authDomain": "trackifier.firebaseapp.com",
  "databaseURL": "https://trackifier.firebaseio.com",
  "projectId": "trackifier",
  "storageBucket": "trackifier.appspot.com",
  "messagingSenderId": "231128310965",
  "appId": "1:231128310965:web:e65a10ed747030bd4b4afc",
}

const firebaseModules = [
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideFunctions(() => getFunctions()),
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFirestoreModule
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const provideTranslation = () => ({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
})

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(
          BrowserModule,
          AppRoutingModule,
          TranslateModule.forRoot(provideTranslation()),
          ...ngrxModules,
          ...firebaseModules
        ),
        provideAnimations(),
        provideHttpClient()
    ],
})
  .catch(err => console.error(err));
