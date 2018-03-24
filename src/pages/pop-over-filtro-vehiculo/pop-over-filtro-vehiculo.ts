import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormGroup, AbstractControl, FormBuilder} from "@angular/forms"
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the PopOverFiltroVehiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-over-filtro-vehiculo',
  templateUrl: 'pop-over-filtro-vehiculo.html',
})
export class PopOverFiltroVehiculoPage {

  private subgrupoId: AbstractControl;
  private lsSubgrupo = [];
  private marcaId;
  private serieId;
  private formFiltro;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: RemoteServiceProvider,  private formBuilder: FormBuilder,
              private viewCtrl: ViewController) {
    this.marcaId = String(navParams.get('marcaId'));
    this.serieId = String(navParams.get('serieId'));
    this.formFiltro  = formBuilder.group({
      subgrupoId: ['']
    });
    this.subgrupoId = this.formFiltro.controls['subgrupoId'];
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOverFiltroVehiculoPage');
  }

  filtroVehiculo(filter) {
    filter.marcaId = this.marcaId;
    filter.serieId = this.serieId;
    filter.inicio = '0';
    this.service.getProductosByMarcaAndSerie(filter).subscribe(
      data => {
        this.viewCtrl.dismiss({filtro: filter, data: data['data']});
      },
      error => {
      }
    );
  }

  init() {
    this.service.getSubgrupo().subscribe(
      data => {
        this.lsSubgrupo = data['data']
      },
      error => {
        (error);
      }
    )
  }

}
