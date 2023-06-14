import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  constructor(private menuController: MenuController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.menuController.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menuController.swipeGesture(true);
  }
}
