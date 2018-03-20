import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
import {
  ModalController,
  NavParams
} from 'ionic-angular';
import {
  AlertController
} from 'ionic-angular';
import {
  HttpService
} from "../../services/HttpService";
import {
  NativeService
} from '../../services/NativeService';
import {
  StorageService
} from '../../services/StorageService';

import {
  HomePage
} from '../../pages/home/home';
import {
  StorePage
} from '../../pages/store/store';
import {
  ENV
} from "@app/env";
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public item: any;
  public onregister: any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public httpService: HttpService, public nativeCtrl: NativeService, public storageService: StorageService, public navParams: NavParams, public modalCtrl: ModalController) {

    this.item = navParams.get("item");
    this.onregister = navParams.get("onregister");
  }
  private params = {};
  public token: string;
  public uuid: string;
  public tvid: string;
  public brand: string;
  public store: string;
  public room: string;
  public deviceId: string;
  private isRegister: string = 'false';
  ionViewDidEnter() {
    this.token = this.storageService.getCookie("token");
    if (this.item) {
      this.store = this.item.key;
    } else {
      this.store = "请选择门店";
    }
    if (this.token == "") {
      let modal = this.modalCtrl.create(HomePage);
      modal.present();
    } else {
      this.uuid = this.getQueryValue("device_UUID", window.location.search);
      this.tvid = this.getQueryValue("tv_id", window.location.search);
      this.brand = this.getQueryValue("brand", window.location.search);
      // this.loadData(this.token, this.deviceId);
      this.checkRegister();
    }

  }
  getQueryValue(key, href) {
    href = href || window.location.search;
    let match = href.match(new RegExp('[?&]' + key + '=([^&]*)'));
    return match && match[1] && decodeURIComponent(match[1]) || '';
  }
  loadData = (token, deviceId) => {
    // let query = {
    //   token: token,
    //   deviceId: deviceId
    // }
    // this.httpService.get(ENV.domain + '/gaia/rest/ott/device/register/detail', query).subscribe(data => {
    //   this.params = data;
    //   this.room = data.room;
    //   this.store = data.storeName;
    // }, err => {
    //   this.nativeCtrl.alert('获取设备信息失败');
    // });
    this.nativeCtrl.alert('获取设备信息失败');
  }

  checkStore = () => {
    if (this.isRegister == "false") {
      let modal = this.modalCtrl.create(StorePage);
      modal.present();
    }
  }

  register = () => {
    if (!this.room) {
      this.nativeCtrl.alert("请输入房间号");
      return
    }
    if (!this.item || !this.item.value) {
      this.nativeCtrl.alert("请选择门店");
      return;
    }
    // let query = {
    //   uuid: this.uuid,
    //   storeId: this.item.value,
    //   storeName: this.item.key,
    //   room: this.room,
    //   model: this.tvid,
    //   deviceBrand: this.brand
    // }

    // this.httpService
    //   .post(
    //     ENV.domain + "/gaia/rest/ott/device/register/" + this.token,
    //     query
    //   )
    //   .subscribe(
    //     data => {
    //       this.isRegister = "true";
    //       this.nativeCtrl.alert("注册设备成功");
    //       this.loadData(this.token, data.devicesId);
    //       this.deviceId = data.devicesId;
    //     },
    //     err => {
    //       this.nativeCtrl.alert("注册设备失败,请确认门店是否开通OTT业务");
    //     }
    //   );
      this.nativeCtrl.alert("注册设备成功");
  }
  delregister = () => {
    // this.httpService.delete(ENV.domain + '/gaia/rest/ott/device/del/' + this.token + "/" + this.deviceId).subscribe(data => {
    //   this.isRegister = 'false';
    // }, err => {
    //   this.nativeCtrl.alert('解除设备绑定失败');
    // });
    this.isRegister = "false";
  }
  checkRegister = () => {

    this.isRegister = "false";

  //   let query = {
  //     token: this.token,
  //     uuid: this.uuid
  //   }
  //   this.httpService.get(ENV.domain + '/gaia/rest/ott/device/register/check', query).subscribe(data => {
  //     this.isRegister = data.rate

  //     if (this.isRegister != "" && this.onregister != "false") {
  //       this.isRegister = "true";
  //       this.deviceId = data.rate;
  //       this.loadData(this.token, data.rate);
  //     } else {
  //       this.isRegister = "false"
  //     }
  //   }, err => {
  //     this.nativeCtrl.alert('获取设备信息失败');
  //   });
 }

}
