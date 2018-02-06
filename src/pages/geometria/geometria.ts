import {Component} from '@angular/core';
import {NavController, PopoverController, AlertController, ModalController} from 'ionic-angular';
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";
import {PopOverFiltroGeometriaPage} from "../pop-over-filtro-geometria/pop-over-filtro-geometria";
import {CONST} from "../../providers/constantes";
import {PopOverPage} from "../pop-over/pop-over";
import {ModalPage} from "../modal-producto/modal";


@Component({
  selector: 'page-geometria',
  templateUrl: 'geometria.html'
})

export class GeometriaPage {

  private maxResult = 10;
  private urlImagen = '';
  private lsSubgrupo = [];
  private subgrupoId = '';
  private productos = [];
  private filtro;
  private blScroll = false;
  private from = '';

  constructor(public navCtrl: NavController, private service: RemoteServiceProvider, private popOverCtrl: PopoverController,
              private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.service.getToken();
    this.init();
    this.urlImagen = CONST.URL_IMAGE;
  }

  infoModal(producto) {
    producto = {
      producto: producto
    };
    let modal = this.modalCtrl.create(ModalPage, producto);
    modal.present();
  }

  checkImage(event) {
    event.target.setAttribute('src', 'assets/imgs/Imagen_no_disponible.png');
  }

  openPopOver(ev: UIEvent) {
    let popover = this.popOverCtrl.create(PopOverPage, {mensaje: 'Haga click sobre "Categoría" y seleccione una, luego presione sobre el icono de filtro.'});
    popover.present({
      ev: ev
    });
  }

  openPopOverFiltro(ev: UIEvent) {
    if (!this.subgrupoId || this.subgrupoId.length === 0) {
      let alert = this.alertCtrl.create({
        title: 'Información',
        subTitle: 'Seleccione una categoria primero.',
        buttons: ['Aceptar']
      });
      alert.present();
    } else {
      let popover = this.popOverCtrl.create(PopOverFiltroGeometriaPage, {subgrupoId: this.subgrupoId});

      popover.present({
        ev: ev
      });

      popover.onDidDismiss(data => {
        if (data !== null) {
          this.productos = data.data;
          this.filtro = data.filtro;
          this.blScroll = true;
          this.from = data.from;
        }
      });
    }
  }

  doInfinite(infiniteScroll) {
    this.filtro.inicio = Number(this.filtro.inicio) + this.maxResult + 1;
    if (this.from === 'Geometria') {
      this.filtroGeometria(infiniteScroll);
    } else if (this.from === 'Rango') {
      this.filtroRango(infiniteScroll);
    }


  }

  filtroGeometria(infiniteScroll) {
    this.service.getGeometria(this.filtro).subscribe(
      data => {
        if (data['data'].length === 0) {
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

  filtroRango(infiniteScroll) {
    this.service.getRango(this.filtro).subscribe(
      data => {
        if (data['data'].length === 0) {
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

  init() {
    this.service.getSubgrupo().subscribe(
      data => {
        this.lsSubgrupo = data['data'].filter(subgrupo => {
          let subgrupoId = subgrupo.id;
          return ( subgrupoId === 1 || subgrupoId === 4 || subgrupoId === 5 || subgrupoId === 6 || subgrupoId === 12 || subgrupoId === 13 || subgrupoId === 14 || subgrupoId === 15 || subgrupoId === 18
            || subgrupoId === 19 || subgrupoId === 20 || subgrupoId === 21 || subgrupoId === 22 || subgrupoId === 24 || subgrupoId === 25 || subgrupoId === 27);
        });
      },
      error => {
        (error);
      }
    )
  }


}
