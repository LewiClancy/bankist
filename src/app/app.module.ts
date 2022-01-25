import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
} from '@angular/fire/compat/firestore';
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';


import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthEffects } from './store/effects/auth.effects';
import { LoginComponent } from './login/login.component';
import { AccountEffects } from './store/effects/account.effects';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

const FirebaseUtilities = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireStorageModule,
  // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  // provideFirestore(() => {
  //   const firestore = getFirestore();
  //   return firestore;
  // }),
  // provideAuth(() => {
  //   const auth = getAuth();
  //   return auth;
  // }),
  // provideStorage(() => {
  //   const storage = getStorage();
  //   return storage;
  // }),
];

const AppEffects = [AuthEffects, AccountEffects];

const NgrxUtilities = [
  StoreModule.forRoot(reducers),
  EffectsModule.forRoot(AppEffects),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
];

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    FirebaseUtilities,
    NgrxUtilities,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.useEmulators
        ? ['https://localhost/9099']
        : undefined,
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators
        ? ['http://localhost/8080']
        : undefined,
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators
        ? ['http://localhost/5001']
        : undefined,
    },
  ],
})
export class AppModule {}
