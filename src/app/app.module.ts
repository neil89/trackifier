import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { timerMainDashboardReducer } from '@containers/timer-main-dashboard/store/reducers/timer-main-dashboard.reducer';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderBarComponent,
    SidePanelComponent,
    StoreModule.forRoot(
      {
        timerMainDashboard: timerMainDashboardReducer
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Trackifier',
      maxAge: 50
    }),
    provideFirebaseApp(() => initializeApp(
      {
        "projectId":"trackifier",
        "appId":"1:231128310965:web:e65a10ed747030bd4b4afc",
        "storageBucket":"trackifier.appspot.com",
        "apiKey":"AIzaSyBW4-TBUDUqreS52SmVh_h9y7xVf_LRUHk",
        "authDomain":"trackifier.firebaseapp.com",
        "messagingSenderId":"231128310965"
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
