import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { ENV } from '@app/env';
import { HttpService } from '../services/HttpService';
import { NativeService } from "../services/NativeService";
import { StorageService } from '../services/StorageService';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { StorePage } from '../pages/store/store';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    StorePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    StorePage
  ],
  providers: [
    StatusBar,
    HttpService,
    NativeService,
    StorageService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
