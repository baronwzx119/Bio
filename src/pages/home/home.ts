import { Component } from '@angular/core';
import { ModalController,NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpService } from "../../services/HttpService";
import { NativeService } from '../../services/NativeService';
import { StorageService } from '../../services/StorageService';
import { ENV } from '@app/env';

import { RegisterPage } from '../../pages/register/register';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public httpService: HttpService, public nativeCtrl: NativeService, public modalCtrl: ModalController, public storageService: StorageService) {

  }
  private name: string = 'test';
  public device: string;
  ionViewDidEnter() {
    this.device = this.getQueryValue("device_UUID", window.location.search);
  }
  getQueryValue (key, href) {
      href = href || window.location.search;
      let match = href.match(new RegExp('[?&]' + key + '=([^&]*)'));
      return match && match[1] && decodeURIComponent(match[1]) || '';
    }
  login = index => {
      this.storageService.setCookie("token", "c9032d64-3594-4353-8605-b1153b947f4b", 1);
      let modal = this.modalCtrl.create(RegisterPage);
      modal.present();

    // let query ={
    //   userName: this.name
    // }
    // this.httpService.post(ENV.domain + '/gaia/rest/ott/device/login/' + this.name, query).subscribe(data => {
    //   this.storageService.setCookie("token",data.rate,1);
    //   let modal = this.modalCtrl.create(RegisterPage);
    //   modal.present();
    // }, err => {
    //   this.nativeCtrl.alert('登陆码错误，请重新输入');
    // });
  };
}
