import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  public type = 'password';
  public showPass = false;
  public iconEye = 'eye-off';
  formRegistro: FormGroup;
  primerNombre: AbstractControl;
  primerApellido: AbstractControl;
  empresa: AbstractControl;
  email: AbstractControl;
  contrasena: AbstractControl;

  validation_messages = {
    'primerNombre': [
      {type: 'required', message: 'El Nombre es requerido.'},
      {type: 'minLength', message: 'Debe tener un minimo de 3 caracteres'},
    ],
    'primerApellido': [
      {type: 'required', message: 'El Apellido es requerido.'},
      {type: 'minLength', message: 'Debe tener un minimo de 3 caracteres'},
    ],
    'contrasena': [
      {type: 'required', message: 'La contraseña es requerida'}
    ]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              private service: RemoteServiceProvider, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    this.formRegistro = this.formBuilder.group({
      primerNombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      primerApellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      empresa: [''],
      email: [''],
      contrasena: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.primerNombre = this.formRegistro.controls['primerNombre'];
    this.primerApellido = this.formRegistro.controls['primerApellido'];
    this.empresa = this.formRegistro.controls['empresa'];
    this.email = this.formRegistro.controls['email'];
    this.contrasena = this.formRegistro.controls['contrasena'];
  }


  ionViewDidLoad() {
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

  registrar(data) {
    let loading = this.loadingCtrl.create({
      content: 'Registrando usuario, por favor espere...  '
    });
    loading.present();
    this.service.registro(data).subscribe(
      data => {
        loading.dismiss();
        if (!data['error']) {
          this.alert();
          this.formRegistro.reset();
        } else {
          let alert = this.alertCtrl.create({
            title: 'Información',
            subTitle: data['mensaje'],
            buttons: ['Aceptar']
          });
          alert.present();
        }
      },
      error => {
        loading.dismiss();
      }
    );
  }


  alert() {
    let msg = "<p> Se ha enviado a tu correo un <strong>nombre de usuario</strong>  y un enlace para la <strong> activación de la cuenta </strong>, que te permitiran acceder a nuestro buscador de productos <strong>BRAKE PAK. </strong> (Si no encuentras el correo en la bandeja de entrada busca en <strong>Spam o correo no deseado</strong>.) </p>";
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: msg,
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
