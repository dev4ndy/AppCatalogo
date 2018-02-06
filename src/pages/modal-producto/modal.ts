import {Component} from '@angular/core';
import {Platform, NavParams, ViewController} from 'ionic-angular';
import {CONST} from "../../providers/constantes";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {

  private producto;
  private urlImagen;
  private option = 'Aplicaciones';
  private items: Object = {};
  private medidas: any = {
    1: {
      field: {
        longitud: true,
        espesor: {
          label: "Ancho (mm)"
        }
      }
    },
    4: {
      field: {
        diametroExt: {
          label: "Diametro pistón (mm)"
        },
        altura: true
      }
    },
    5: {
      field: {
        diametro: {
          label: "Diametro(mm)"
        }
      }
    },
    6: {
      field: {
        diametroInt: {
          label: 'Diametro interno (mm)'
        },
        altura: true,
        espesor: true
      }
    },
    12: {
      field: {
        longitud: true,
      }
    },
    26: {
      field: {
        longitud: true
      }
    },
    13: {
      field: {
        diametro: {
          label: "Diametro (\")"
        }
      }
    },
    14: {
      field: {
        diametro: {
          label: "Diametro (\")"
        }
      }
    },
    15: {
      field: {
        diametro: {
          label: "Diametro (\")"
        }
      }
    },

    18: {
      field: {
        diametro: {
          label: "Diametro (\")"
        }
      }
    },
    19: {
      field: {
        diametro: {
          label: "Diametro (\")"
        }
      }
    },
    20: {
      field: {
        diametro: {
          label: "Diametro (\")"
        }
      }
    },
    21: {
      field: {
        diametro: {
          label: "Diametro (\")"
        }
      }
    },
    22: {
      field: {
        diametro: {
          label: "Diametro (mm)"
        }
      }
    },
    24: {
      field: {
        diametroExt: {
          label: "Diametro externo (mm)"
        },
        rango: {
          label: "rango diametro externo",
          filtro: "diametroExt"
        },
        espesor: {
          label: "Espesor (mm)"
        },
        diametroIntBocin: {
          label: 'Diametro Int. Bocin'
        },
        agujeros: {
          label: '# Agujeros'
        },
        altura: {
          label: "Altura total (mm)"
        },
        tipo: true
      }
    },
    25: {
      field: {
        fmsi: true,
        oem: true,
        alterno: true,
        rango: {
          label: "rango diametro interno",
          filtro: "diametro"
        },
        diametro: {
          label: 'Diametro tambor (mm)'
        },
        agujeros: {
          label: '# Agujeros'
        },
        diametroIntBocin: {
          label: 'Diametro Int. Bocin'
        },
        espesor: {
          label: "Ancho - pista (mm)"
        },
        altura: {
          label: "Altura total (mm)"
        }
      }
    },
    27: {
      field: {
        diametro: {
          label: 'Diametro (mm)'
        }
      }
    }
  };
  private blMedida: boolean = true;

  getItems(type: any) {
    return this.items[type];
  }

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public service: RemoteServiceProvider) {
    this.urlImagen = CONST.URL_IMAGE;
    this.producto = this.params.get('producto');
    console.log(this.producto);
    if (!this.producto.hasOwnProperty('productoId')) {
      this.producto['productoId'] = this.producto['id'];
    }

    this.service.getProductoById(this.producto.productoId).subscribe(
      data => {
        let producto = data['data'][0];
        let marca;
        let serie;
        this.items['Aplicaciones'] = [];
        for (let i = 0; i < data['data'].length; i++) {
          marca = data['data'][i]['marca'];
          serie = JSON.parse("[" + data['data'][i]['serie'] + "]");
          this.items['Aplicaciones'].push({marca: marca, serie: serie});
        }
        data = data['data'][0]
        let subgrupoId = data['subgrupoId'];
        this.items['Medidas'] = [];
        if (this.medidas.hasOwnProperty(subgrupoId)) {
          this.blMedida = true;
          let medida = this.medidas[subgrupoId]['field'];
          let label = "";
          for (let i in medida) {
            let valor = data[i];
            var lbl = medida[i];
            if ((typeof lbl === "object") && (lbl !== null)) {
              this.items['Medidas'].push({label: lbl['label'], valor: valor})
            } else {
              this.items['Medidas'].push({label: i, valor: valor});
            }
          }
        } else {
          this.blMedida = false;
        }
      },
      error => {

      });

  }

  checkImage(event) {
    event.target.setAttribute('src', 'assets/imgs/Imagen_no_disponible.png');
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
