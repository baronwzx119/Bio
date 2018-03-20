import { Injectable } from "@angular/core";
import { LoadingController, Loading, AlertController } from 'ionic-angular';

@Injectable()
export class NativeService {
    // loading =>loading提示框
    // loadingIsOpen=>loading提示框是否打开
    private loading: Loading;
    private loadingIsOpen: boolean = false;
    constructor(
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) {
    }
    //打开alert提示框
    alert = (() => {
        let isExist = false;
        return (title: string, subTitle: string = '', message: string = ''): void => {
            if (!isExist) {
                isExist = true;
                this.alertCtrl.create({
                    title: title,
                    subTitle: subTitle,
                    message: message,
                    buttons: [{
                        text: '确定', handler: () => {
                            isExist = false;
                        }
                    }],
                    enableBackdropDismiss: false
                }).present();
            }
        };
    })();

    showConfirm(title: any = null, message: any = null, ok: any = null, cancel: any = null) {
        let confirm = this.alertCtrl.create({
            title: title ? title : "",
            message: message ? message : "",
            buttons: [
                {
                    text: ok ? ok : "是",
                    handler: () => {
                        return true;
                    }
                },
                {
                    text: cancel ? cancel:"否",
                    handler: () => {
                        return false;
                    }
                }
            ]
        });
        confirm.present();
    }
    // 打开loading提示框
    showLoading(content:string="",time:any=""):void {
        if (!this.loadingIsOpen) {
            this.loadingIsOpen = true;
            this.loading = this.loadingCtrl.create({
                content: content
            });
            this.loading.present();
            if (time){
                setTimeout(() => {
                    this.dismissLoading();
                }, time);
            }
        }
    }
    // 隐藏loading提示框
    hideLoading(): void {
        setTimeout(() => {
            this.dismissLoading();
        }, 200);
    }
    // 关闭loading提示框函数
    dismissLoading() {
        if (this.loadingIsOpen) {
            this.loadingIsOpen = false;
            this.loading.dismiss();
        }
    }
    // 判断是否有网络
    isConnecting(): boolean {
        return this.getNetworkType() != 'none';
    }
    getNetworkType(): string {
       return "wifi";
    }
}