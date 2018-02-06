import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormGroup, AbstractControl, FormBuilder} from "@angular/forms"
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the PopOverFiltroGeometriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-over-filtro-geometria',
  templateUrl: 'pop-over-filtro-geometria.html',
})
export class PopOverFiltroGeometriaPage {

  formFiltro: FormGroup;
  formRango: FormGroup;
  longitud: AbstractControl;
  espesor: AbstractControl;
  altura: AbstractControl;
  diametroExt: AbstractControl;
  diametro: AbstractControl;
  diametroInt: AbstractControl;
  diametroIntBocin: AbstractControl;
  agujeros: AbstractControl;
  tipo: AbstractControl;
  min: AbstractControl;
  max: AbstractControl;
  subgrupoId: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private service: RemoteServiceProvider,
              private viewCtrl: ViewController) {
    this.subgrupoId = Number(navParams.get('subgrupoId'));
    this.formFiltro = formBuilder.group({
      longitud: [''],
      espesor: [''],
      altura: [''],
      diametroExt: [''],
      diametro: [''],
      diametroInt: [''],
      diametroIntBocin: [''],
      agujeros: [''],
      tipo: [''],
    });
    this.formRango = formBuilder.group({
      min: [''],
      max: [''],
    });

    this.longitud = this.formFiltro.controls['longitud'];
    this.espesor = this.formFiltro.controls['espesor'];
    this.diametroExt = this.formFiltro.controls['diametroExt'];
    this.diametroInt = this.formFiltro.controls['diametroInt'];
    this.diametro = this.formFiltro.controls['diametro'];
    this.altura = this.formFiltro.controls['altura'];
    this.diametroIntBocin = this.formFiltro.controls['diametroIntBocin'];
    this.agujeros = this.formFiltro.controls['agujeros'];
    this.tipo = this.formFiltro.controls['tipo'];
    this.min = this.formRango.controls['min'];
    this.max = this.formRango.controls['max'];

  }

  ionViewDidLoad() {
    ('ionViewDidLoad PopOverFiltroGeometriaPage');
  }

  filtroGeometria(filter) {
    filter.subgrupoId = this.subgrupoId;
    filter.inicio = '0';
    (filter);
    this.service.getGeometria(filter).subscribe(
      data => {
        this.viewCtrl.dismiss({filtro: filter, data: data['data'], 'from': 'Geometria'});
      },
      error => {
      }
    );
  }

  filtroRango(filter, filtro) {
    (filter);
    filter.subgrupoId = this.subgrupoId;
    filter.filtro = filtro;
    filter.inicio = 0;
    this.service.getRango(filter).subscribe(
      data => {
        (data);
        this.viewCtrl.dismiss({filtro: filter, data: data['data'], 'from': 'Rango'});
      },
      error => {
      }
    );
  }


}
