import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modulos
import { SharedModule } from './components/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/* import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; */

import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './interceptors/jwt-interceptor.interceptor';

// import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { environment } from 'src/environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    /* AngularFireModule.initializeApp(environment.firebaseConfig), // , */
    /* AngularFireStorageModule, */
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:44382', 'https://localhost:44382'],  // Actualizado
        disallowedRoutes: [],  // Actualizado
      },
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
