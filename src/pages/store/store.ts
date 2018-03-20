import { Component } from '@angular/core';
import { ModalController,NavController, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpService } from "../../services/HttpService";
import { NativeService } from '../../services/NativeService';
import { StorageService } from '../../services/StorageService';
import { ENV } from '@app/env';


import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';
@Component({
  selector: 'page-store',
  templateUrl: 'store.html'
})
export class StorePage {

  constructor(public navCtrl: NavController, public httpService: HttpService, public storageService: StorageService, public nativeCtrl: NativeService, public viewCtrl: ViewController, public modalCtrl: ModalController) {

  }
  public token: string;
  private search:string ="";
  private items:any = [];
  private historys:any = [];
  private loading:boolean =false;
  ionViewDidEnter() {
    this.token = this.storageService.getCookie("token");
    if (this.token == "") {
      this.navCtrl.push(HomePage);
    }
    this.historys = this.storageService.get("searchhistory", "localStorage");
  }
  
  getItems = (str:any) =>{
    this.loading = true;
    let val:any;
    if (str.target){
      val = str.target.value;
    }else{
      val = str;
    }
    
    
    if (val && val !== "" && val !== " "){
      let query={
        storeName: val,
        token:this.token
      }
      
      this.httpService.get("./stores.json").subscribe(data => {
        this.items = [];
        this.loading = false;
        for (let i = 0; i < data.length;i++){
          if (data[i].key && data[i].key != null){
          this.items.push(data[i]);
          }else{
          }
        }
      }, err => {
        this.nativeCtrl.alert('获取门店信息失败');
      });
    }else{
      this.items = [];
    }
  }

  setStore = (str:any) =>{
    for (let i = 0; i < this.items.length; i++) {
      if (String(this.items[i].key).indexOf(str.key) != -1){
        if (this.storageService.get("searchhistory","localStorage")){
          let history = this.storageService.get("searchhistory", "localStorage");
          for (let j = 0; j < history.length;j++){
            if (String(this.items[i].key).indexOf(history[j].key) !=-1){
              this.gotoDetail(this.items[i]);
              return
            }
          }
          history.unshift(this.items[i]);
          this.storageService.set("searchhistory", history, "localStorage");
          this.gotoDetail(this.items[i]);
        }else{
          this.storageService.set("searchhistory", [this.items[i]], "localStorage");
          this.gotoDetail(this.items[i]);
        }
      }
    }
    
  }
  sethistory = (str: any) => {
    this.search=str.key
    let arr:any = this.search.split(" ");
    let query:string;
    if (arr.length >1){
      query = arr[1];
    }else{
      query = arr[0];
    }
    this.getItems(query);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  gotoDetail = (item:any) =>{
    let modal = this.modalCtrl.create(RegisterPage, {
      item: item,
      onregister:'false'
    });
    modal.present();
  }
}
