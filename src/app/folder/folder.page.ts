import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public clientes: any[];
  public totalClientes: number = 0;
  public clientesCabelo: number = 0;
  public clientesBarba: number = 0;

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    public route: Router
  ) {}

  ngOnInit() {
    this.getClientesProximos();
  }

  getClientesProximos() {
    const dataAtual = moment().format('YYYY-MM-DD');
    this.apiService.buscarAgendamentosPorData(dataAtual).subscribe((data) => {
      console.log(Object.values((data as any)['filtro_data']));
      this.clientes = Object.values((data as any)['filtro_data']).slice(0, 5);
    });
  }

  remover(id: any) {
    console.log(id);
    this.alertCtrl
      .create({
        header: 'Desmarcar',
        message: 'Deseja desmarcar este agendamento?',
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.apiService.delete(id).subscribe(() => {
                this.clientes = this.clientes.filter(
                  (cliente) => cliente._id !== id
                );
              });
            },
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alertEL) => alertEL.present());
  }

  refreshPage(e) {
    this.getClientesProximos();
    setTimeout(() => {
      e.target.complete();
    }, 2000);
  }
}
