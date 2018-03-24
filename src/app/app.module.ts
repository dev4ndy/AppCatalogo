import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';


import {ReferenciaPage} from "../pages/referencia/referencia";
import {GeometriaPage} from '../pages/geometria/geometria';
import {VehiculoPage} from '../pages/vehiculo/vehiculo';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {RegistroPage} from "../pages/registro/registro";
import {RecuperarContrasenaPage} from "../pages/recuperar-contrasena/recuperar-contrasena";
import {ModalPage} from "../pages/modal-producto/modal";
import {PopOverPage} from "../pages/pop-over/pop-over";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SelectSearchableModule} from '../components/select-searchable/select-searchable-module';
import {HttpClientModule} from '@angular/common/http';
import {RemoteServiceProvider} from '../providers/remote-service/remote-service';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {Keyboard} from '@ionic-native/keyboard';
import {IonicStorageModule} from '@ionic/storage';
import {CapitalizePipe} from "../providers/capitalize";
import {PopOverFiltroGeometriaPage} from "../pages/pop-over-filtro-geometria/pop-over-filtro-geometria";
import {PopOverFiltroVehiculoPage} from "../pages/pop-over-filtro-vehiculo/pop-over-filtro-vehiculo";


@NgModule({
  declarations: [
    MyApp,
    ReferenciaPage,
    CapitalizePipe,
    GeometriaPage,
    VehiculoPage,
    TabsPage,
    LoginPage,
    RegistroPage,
    RecuperarContrasenaPage,
    ModalPage,
    ModalPage,
    PopOverPage,
    PopOverFiltroGeometriaPage,
    PopOverFiltroVehiculoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {scrollAssist: false, autoFocusAssist: false}),
    SelectSearchableModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReferenciaPage,
    GeometriaPage,
    VehiculoPage,
    TabsPage,
    LoginPage,
    RegistroPage,
    RecuperarContrasenaPage,
    ModalPage,
    PopOverPage,
    PopOverFiltroGeometriaPage,
    PopOverFiltroVehiculoPage
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
