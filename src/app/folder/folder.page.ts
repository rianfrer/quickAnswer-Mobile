import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public clientes: any;
  constructor(private apiService: ApiService) {
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

  remover(id: number) {
    console.log(id);
    this.apiService.delete(id).subscribe(() => {
      // this.clientes = this.clientes.filter((cliente) => cliente.user_id !== id);
      this.apiService.getAll().subscribe(response => {
        this.clientes = response;
      })
    });
  }
}
