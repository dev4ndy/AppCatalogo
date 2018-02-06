import {Component} from '@angular/core';
import {NavController, ModalController, AlertController, LoadingController, PopoverController} from 'ionic-angular';
import {CONST} from "../../providers/constantes";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";
import {SelectSearchable} from "../../components/select-searchable/select-searchable";
import {ModalPage} from "../modal-producto/modal";
import {PopOverPage} from "../pop-over/pop-over";


@Component({
  selector: 'page-referencia',
  templateUrl: 'referencia.html'
})
export class ReferenciaPage {

  private urlImagen;
  private referencias;
  private vehiculo;
  private productos = [];
  private time;
  private filtro;
  private blScroll = true;
  private maxResult = 10;

  constructor(public navCtrl: NavController, private service: RemoteServiceProvider,
              private loadingCtrl: LoadingController, private modalCtrl: ModalController, private popOverCtrl: PopoverController) {
    this.urlImagen = CONST.URL_IMAGE;
  }

  openPopOver(ev: UIEvent) {
    let popover = this.popOverCtrl.create(PopOverPage, {mensaje: 'Haga click sobre "Buscar por referencia", luego ingrese la referencia'});

    popover.present({
      ev: ev
    });

  }

  searchReferencia(event: { component: SelectSearchable, text: string }) {
    let text = (event.text || '').trim().toLowerCase();

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 3) {
      return;
    }

    event.component.isSearching = true;
    this.service.getReferencia(text).subscribe(
      data => {
        if (data['data'].length === 0 || !data['data']) {
          this.referencias = [];
          event.component.items = [];
        } else {
          this.referencias = data['data'];
          event.component.items = data['data'];
        }
        event.component.isSearching = false;
      },
      error => {
      }
    );
  }

  referenciaChange(event: { component: SelectSearchable, value: any }) {
    this.productos = []
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    let data = event.value;
    data.inicio = 0;
    this.filtro = data;
    this.service.getProductosByReferencia(data).subscribe(
      data => {
        if (data['data'].length === 0 || !data['data']) {
          this.blScroll = false;
        } else {
          this.blScroll = true;
          let keys = Object.keys(data['data']);
          keys.map(key => {
            this.productos.push(data['data'][key][0]);
          });
        }
        loading.dismiss();
      },
      error => {
        loading.dismiss();
      });
  }

  infoModal(producto) {
    producto = {
      producto: producto
    };
    let modal = this.modalCtrl.create(ModalPage, producto);
    modal.present();
  }

  doInfinite(infiniteScroll) {
    this.filtro.inicio = Number(this.filtro.inicio) + this.maxResult + 1;
    this.service.getProductosByReferencia(this.filtro).subscribe(
      data => {
        if (data['data'].length === 0 || !data['data']) {
          this.blScroll = false;
        } else {
          this.blScroll = true;
          let keys = Object.keys(data['data']);
          keys.map(key => {
            this.productos.push(data['data'][key][0]);
          });
        }
      },
      error => {
      });
  }
}
