import { ApiService } from '../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {
  public clientes: any ;

  constructor(private apiService: ApiService) {
    // this.getCliente();
  }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.apiService.getClientes().subscribe((data) => {
      console.log(data);
      this.clientes = data;
    });
  }
}
