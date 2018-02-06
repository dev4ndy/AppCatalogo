import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';

/**
 * Generated class for the PopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-over',
  templateUrl: 'pop-over.html',
})
export class PopOverPage {
  private msg: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.msg = navParams.get('mensaje');
  }

  ionViewDidLoad() {
    ('ionViewDidLoad PopOverPage');
  }

  showAyudaAlert() {
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: ''+this.msg,
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
