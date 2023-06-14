import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: any;
  categoria: any;
  servico: any;
  nome: any;
  data: any;
  hora: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private apiService: ApiService,
    private toastCtrl: ToastController
  ) {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      console.log(this.id);
      this.getAgend(this.id);
    });
  }

  ngOnInit() {}

  getAgend(id: any) {
    this.apiService.getAgend(id).subscribe(
      (res: any) => {
        console.log(Object.values(res));
        let agendamento = res[id];
        this.categoria = agendamento.user_selecao_categoria;
        this.servico = agendamento.user_selecao_servico2;
        this.nome = agendamento.user_name;
        this.hora = agendamento.user_time;
        this.data = agendamento.user_date;
      },
      (err: any) => {
        console.log('ERROR', err);
      }
    );
  }

  async updateAgendamento() {
    const confirmAlert = await this.alertCtrl.create({
      header: 'Alterar',
      message: 'Deseja alterar este agendamento?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.apiService
              .updateAgendamento(
                this.id,
                this.nome,
                this.data,
                this.hora,
                this.categoria,
                this.servico
              )
              .subscribe(
                (res: any) => {
                  console.log(res);
                  if (res.msg_error) {
                    this.presentToast(res.msg_error, 'danger');
                  } else {
                    this.presentToast(res.msg, 'success');
                    this.router.navigateByUrl('/folder');
                  }

                },
                (err: any) => {
                  console.log('ERROR', err);
                }
              );
          },
        },
        {
          text: 'Não',
        },
      ],
    });

    await confirmAlert.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
    });

    await toast.present();
  }
}
