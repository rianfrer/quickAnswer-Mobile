import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import moment from 'moment';
@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {
  public diasComAgendamentos: string[] = [];
  public clientes: any[];
  public selectedDate: string;

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.filterAgendamentos();
  }

  onDateChange(event: any) {
    this.selectedDate = moment(event.target.value).format('YYYY-MM-DD');
    console.log(this.selectedDate);
    this.filterAgendamentos();
  }

  filterAgendamentos() {
    this.apiService
      .buscarAgendamentosPorData(this.selectedDate)
      .subscribe((apiResponse: any) => {
        console.log(Object.values(apiResponse['filtro_data']));
        this.clientes = Object.values(apiResponse['filtro_data']).filter(
          (value) => typeof value === 'object'
        );
      });
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
