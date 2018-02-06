import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the RecuperarContrasenaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-contrasena',
  templateUrl: 'recuperar-contrasena.html',
})
export class RecuperarContrasenaPage {

  private formRecuperar: FormGroup;
  private email: AbstractControl;
  validation_messages = {
    'email': [
      {type: 'required', message: 'El Correo es requerido'}
    ]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              private service: RemoteServiceProvider, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    this.formRecuperar = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });
    this.email = this.formRecuperar.controls['email'];
  }

  recuperar(data) {
    let loading = this.loadingCtrl.create({
      content: 'Enviando correo de recuperación, por favor espere...  '
    });
    loading.present();
    this.service.recuperarpass(data).subscribe(
      data => {
        loading.dismiss()
        let msg = "";
        if (!data['error']) {
          msg = "<p> Se ha enviado a tu correo un enlace para la <strong> recuperación de la contraseña </strong> (Si no encuentras el correo en la bandeja de entrada busca en <strong>Spam o correo no deseado</strong>.) </p>";
          this.alert(msg);
          this.formRecuperar.reset();
        } else {
          msg = data['mensaje'];
          this.alert(msg);
        }
      },
      error => {
        loading.dismiss();
      }
    )
  }

  alert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: msg,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  ionViewDidLoad() {
    ('ionViewDidLoad RecuperarContrasenaPage');
  }

}
