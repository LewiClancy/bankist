import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthEffects } from './store/effects/auth.effects';
import { LoginComponent } from './login/login.component';

const FirebaseUtilities = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFirestoreModule,
];

const AppEffects = [AuthEffects];

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
