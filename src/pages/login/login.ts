import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, LoadingController, AlertController} from 'ionic-angular';
import {RegistroPage} from "../registro/registro";
import {RecuperarContrasenaPage} from "../recuperar-contrasena/recuperar-contrasena";
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";
import {TabsPage} from "../tabs/tabs";
import {Storage} from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  formLogin: FormGroup;
  userName: AbstractControl;
  contrasena: AbstractControl;
  loginAuto: AbstractControl;
  public type = 'password';
  public showPass = false;
  public iconEye = 'eye-off';
  public pageRegistro = RegistroPage;
  public pageRecuperarContrasena = RecuperarContrasenaPage;
  validation_messages = {
    'username': [
      {type: 'required', message: 'El usuario es requerido.'},
    ],
    'contrasena': [
      {type: 'required', message: 'La contraseña es requerida'}
    ]
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform,
              private formBuilder: FormBuilder, private service: RemoteServiceProvider,
              private loadingCtrl: LoadingController, private alertCtrl: AlertController,
              private storange: Storage) {
    this.formLogin = formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      contrasena: ['', Validators.compose([Validators.required])],
      loginAuto: [''],
    });

    this.userName = this.formLogin.controls['userName'];
    this.contrasena = this.formLogin.controls['contrasena'];
    this.loginAuto = this.formLogin.controls['loginAuto'];
  }

  ionViewWillEnter() {
    this.storange.get('AUTO').then((auto) => {
      this.loginAuto.setValue(auto);
      if (auto) {
        this.storange.get('USER_NAME').then((user) => {
          this.userName.setValue(user);
          this.storange.get('PASS').then((pass) => {
            this.contrasena.setValue(pass);
            this.iniciarSesion(this.formLogin.value);
          });
        });
      }
    });
  }


  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
      this.iconEye = 'eye';
    } else {
      this.type = 'password';
      this.iconEye = 'eye-off';
    }
  }

  openTabsPage() {
    this.navCtrl.push(TabsPage)
  }

  saveCredentials() {
    if (this.loginAuto.value) {
      this.storange.set('PASS', this.contrasena.value);
      this.storange.set('USER_NAME', this.userName.value);
      this.storange.set('AUTO', this.loginAuto.value);
    }
  }


  iniciarSesion(data) {
    let loading = this.loadingCtrl.create({
      content: 'Por favor espera...'
    });
    loading.present();

    this.service.iniciarSesion(data).subscribe(
      data => {
        if (!data.error) {
          console.log(data.data);
          this.storange.set('KEY_APP', data.data);
          this.saveCredentials();
          loading.dismiss();
          this.openTabsPage();
        } else {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Alerta!',
            subTitle: 'Las credenciales ingresadas son incorrectas.',
            buttons: ['Aceptar']
          });

          alert.present();
        }
      },
      error => {
        (error.toString());
        ("Error occured: " + error);
      });
  }
}
