import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public clientes: any;
  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    public route: Router
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
