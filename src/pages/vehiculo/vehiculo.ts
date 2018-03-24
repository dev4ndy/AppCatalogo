import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {SelectSearchable} from '../../components/select-searchable/select-searchable';
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";
import {ModalController, PopoverController} from 'ionic-angular';
import {CONST} from "../../providers/constantes";
import {PopOverPage} from "../pop-over/pop-over";
import {ModalPage} from "../modal-producto/modal";
import {PopOverFiltroVehiculoPage} from "../pop-over-filtro-vehiculo/pop-over-filtro-vehiculo";


class Vehiculo {
  public serieId: number;
  public nombre: string;
  public marcaId: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'vehiculo.html'
})
export class VehiculoPage {

  private maxResult = 10;
  private urlImagen;
  private vehiculos: Vehiculo[];
  private productos = [];
  private filtro;
  private blScroll = true;
  private time: Date;
  private marcaId = "";
  private serieId = "";
  private subgrupoId = "";

  constructor(public navCtrl: NavController, private service: RemoteServiceProvider,
              private loadingCtrl: LoadingController, private modalCtrl: ModalController, private popOverCtrl: PopoverController) {
    this.urlImagen = CONST.URL_IMAGE;
    console.log('vehiculo.ts');
  }

  ionViewDidLoad() {
  }


  checkImage(event) {
    event.target.setAttribute('src', 'assets/imgs/Imagen_no_disponible.png');
  }


  openPopOver(ev: UIEvent) {
    let popover = this.popOverCtrl.create(PopOverPage, {mensaje: 'Haga click sobre "Buscar vehículo", luego ingrese la marca (ej. Mazda) o la serie (ej. CX-5)'});
    popover.present({
      ev: ev
    });
  }

  openPopOverFiltro(ev: UIEvent) {
    let popover = this.popOverCtrl.create(PopOverFiltroVehiculoPage, {marcaId: this.marcaId, serieId: this.serieId});

    popover.present({
      ev: ev
    });

    popover.onDidDismiss(data => {
      if (data !== null) {
        this.productos = data.data;
        this.filtro = data.filtro;
        this.blScroll = true;
      }
    });

  }

  searchVehiculo(event: { component: SelectSearchable, text: string }) {
    let text = (event.text || '').trim().toLowerCase();

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 3) {
      this.time = new Date();
      return;
    }
    event.component.isSearching = true;
    this.service.getVehiculo(text).subscribe(
      data => {
        if (data['data'].length === 0 || !data['data']) {
          this.vehiculos = [];
          event.component.items = [];
        } else {
          this.vehiculos = data['data'];
          event.component.items = data['data'];
        }
        event.component.isSearching = false;
      },
      error => {
        console
          .log(error);
      });
  }

  vehiculoChange(event: { component: SelectSearchable, value: any }) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    let data = event.value;
    this.marcaId = data.marcaId;
    this.serieId = data.serieId;
    data = {
      serieId: data.serieId,
      marcaId: data.marcaId,
      subgrupoId: '',
      inicio: 0
    };
    this.filtro = data;
    this.service.getProductosByMarcaAndSerie(data).subscribe(
      data => {
        console.log(data);
        if (data['data'].length === 0 || !data['data']) {
          this.blScroll = false;
        } else {
          this.blScroll = true;
          this.productos = data['data'];
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
    this.service.getProductosByMarcaAndSerie(this.filtro).subscribe(
      data => {
        if (data['data'].length === 0 || !data['data']) {
          this.blScroll = false;
        } else {
          for (let producto of data['data']) {
            this.productos.push(producto);
          }
        }
        infiniteScroll.complete();
      },
      error => {
      });
  }
}
