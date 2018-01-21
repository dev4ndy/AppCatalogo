import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { VehiculoPage } from '../vehiculo/vehiculo';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = VehiculoPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
