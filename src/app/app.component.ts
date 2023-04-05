import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Próximos clientes', url: '/folder', icon: 'hourglass' },
    { title: 'Meus agendamentos', url: '/agendamentos', icon: 'calendar-number' },
    { title: 'Configuraçãoes', url: '/folder/Trash', icon: 'settings' },
    { title: 'Sair', url: '/login', icon: 'exit' },
  ];
  constructor() {}
}
