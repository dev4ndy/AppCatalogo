import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {SelectSearchable} from '../../components/select-searchable/select-searchable';
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";


class Port {
  public id: number;
  public name: string;
  public country: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'vehiculo.html'
})
export class VehiculoPage {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private service: RemoteServiceProvider) {

  }

  getVehiculos() {
   /* this.service.iniciarSesion().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        console.log("Error occured: " + error);
      });*/
  }

  infoVehiculo() {
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: 'Haga click sobre "Buscar vehículo", luego ingrese la marca (ej. Mazda) o la serie (ej. CX-5)',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  getPorts(): Port[] {
    return [
      {id: 0, name: 'Tokai', country: 'Japan'},
      {id: 2, name: 'Vladivostok', country: 'Russia'},
      {id: 3, name: 'Navlakhi', country: 'India'},
      {id: 4, name: 'Cayman Brac', country: 'Cayman Islands'},
      {id: 5, name: 'Areia Branca', country: 'Brazil'},
      {id: 6, name: 'Port Ibrahim', country: 'Egypt'},
      {id: 7, name: 'Brahestad', country: 'Finland'},
      {id: 8, name: 'Brake', country: 'Germany'},
      {id: 9, name: 'Hantsport NS', country: 'Canada'},
      {id: 10, name: 'Santa Maria Bay', country: 'Cape Verde'},
      {id: 11, name: 'Antofagasta', country: 'Chile'},
      {id: 12, name: 'San Antonio', country: 'Chile'},
      {id: 13, name: 'Santa Barbara', country: 'Chile'},
      {id: 14, name: 'Cabo San Antonio', country: 'Argentina'},
      {id: 15, name: 'Diamante', country: 'Argentina'},
      {id: 16, name: 'San Antonio Este Arg', country: 'Argentina'},
      {id: 17, name: 'Santa Anna Bay', country: 'Curacao'},
      {id: 18, name: 'Hambantota', country: 'Sri Lanka'},
      {id: 19, name: 'Antananarivo', country: 'Madagascar'},
      {id: 20, name: 'Navegantes', country: 'Brazil'},
      {id: 21, name: 'Bantry Bay', country: 'Ireland'},
      {id: 22, name: 'Porto Levante', country: 'Italy'},
      {id: 23, name: 'Port of Antikyra', country: 'Greece'},
      {id: 24, name: 'Berantai FPSO', country: 'Malaysia'}
    ];
  }



  searchPorts(event: { component: SelectSearchable, text: string }) {
    let text = (event.text || '').trim().toLowerCase();

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 3) {
      return;
    }

    event.component.isSearching = true;


    // Simulate AJAX.
    event.component.items

    event.component.isSearching = false;
  }

}
