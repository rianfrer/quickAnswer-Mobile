import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  senha: string;

  constructor(
    public toastController: ToastController,
    private route: Router,
    private menuController: MenuController
  ) {}

  ngOnInit() {}

  login() {
    if (this.email === 'admin@admin.com' && this.senha === '123') {
      this.route.navigateByUrl('/folder');
      this.presentToast('Seja bem vindo!', 'success');
    } else {
      this.presentToast('ERRO, usuário e/ou senha inválidos!', 'danger');
    }
  }

  async presentToast(texto: string, cor: string) {
    const toast = await this.toastController.create({
      message: texto,
      color: cor,
      duration: 2000,
    });
    toast.present();
  }

  ionViewDidEnter() {
    this.menuController.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menuController.swipeGesture(true);
  }
}
