import { Component } from '@angular/core';

import { ReferenciaPage} from '../referencia/referencia';
import { GeometriaPage } from '../geometria/geometria';
import { VehiculoPage } from '../vehiculo/vehiculo';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = VehiculoPage;
  tab2Root = ReferenciaPage;
  tab3Root = GeometriaPage;

  constructor() {

  }
}
