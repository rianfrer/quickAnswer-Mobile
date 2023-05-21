import { ApiService } from '../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {
  public clientes: any;
  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController
  ) {
    this.getClientes();
    //  this.updateClientes();
    // this.deleteClientes();
  }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.apiService.getAll().subscribe((data) => {
      console.log(Object.values((data as any)['all_docs']));
      this.clientes = Object.values((data as any)['all_docs']);
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
                // this.apiService.getAll().subscribe(response => {
                //   this.clientes = response;
                // })
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
}
