import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { WeatherDashboardComponent } from './home/weather-dashboard/weather-dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { WeatherArticlesComponent } from './home/weather-articles/weather-articles.component';
import {OwlModule} from 'ngx-owl-carousel';
import {SafePipe} from './shared/pipes/safe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherDetailsComponent } from './home/weather-details/weather-details.component';
import {MatButtonModule, MatIconModule, MatTabsModule, MatToolbarModule} from '@angular/material';
import {NgApexchartsModule} from 'ng-apexcharts';
import { WeatherChartComponent } from './home/weather-chart/weather-chart.component';
import { HeaderComponent } from './home/header/header.component';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import {SecureGuard} from './auth/secure.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    WeatherDashboardComponent,
    WeatherArticlesComponent,
    SafePipe,
    WeatherDetailsComponent,
    WeatherChartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    OwlModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    NgApexchartsModule
  ],
  providers: [AuthService, AuthGuard, SecureGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
