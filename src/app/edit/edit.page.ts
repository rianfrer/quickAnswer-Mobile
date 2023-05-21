import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
    private apiService: ApiService
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

  updateAgendamento() {
    this.apiService.updateAgendamento(this.id, this.nome, this.data, this.hora, this.categoria, this.servico).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigateByUrl('/folder')
      },
      (err: any) => {
        console.log('ERROR', err);
      }
    );
  }
}
