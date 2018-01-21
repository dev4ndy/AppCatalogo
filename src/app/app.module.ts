import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {VehiculoPage} from '../pages/vehiculo/vehiculo';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {RegistroPage} from "../pages/registro/registro";
import {RecuperarContrasenaPage} from "../pages/recuperar-contrasena/recuperar-contrasena";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SelectSearchableModule} from '../components/select-searchable/select-searchable-module';
import {HttpClientModule} from '@angular/common/http';
import {RemoteServiceProvider} from '../providers/remote-service/remote-service';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import { Keyboard } from '@ionic-native/keyboard';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    VehiculoPage,
    TabsPage,
    LoginPage,
    RegistroPage,
    RecuperarContrasenaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {scrollAssist: false, autoFocusAssist: false}),
    SelectSearchableModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    VehiculoPage,
    TabsPage,
    LoginPage,
    RegistroPage,
    RecuperarContrasenaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,
    ScreenOrientation,
    Keyboard
  ]
})
export class AppModule {
}
