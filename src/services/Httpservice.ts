import { Injectable } from '@angular/core';
import {
    Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod
} from '@angular/http';
import { Observable, TimeoutError } from "rxjs";
import { NativeService } from "./NativeService";
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { StorageService } from './StorageService';
import { get } from '@ionic-native/core';

@Injectable()
export class HttpService {
  private token;
  constructor(public http: Http,
    public nativeService: NativeService,
    public modal: ModalController,
    public storageService: StorageService
  ) {
    let login = this.getToken();
    if(login){

    }else{
    }
  }

  public getToken=()=>{
    let userInfo = this.storageService.get('userInfo', 'session')
    let token;
    if (!userInfo) {
      return
    }else{
      token = userInfo.token;
      return token;
    }
  }


  public request(url: string, options: RequestOptionsArgs): Observable < Response > {
    this.nativeService.hideLoading();
    return Observable.create(observer => {
      this.http.request(url, options).timeout(10000).subscribe(res => {

        let result = this.requestSuccessHandle(url, options, res);
        result.success ? observer.next(result.data) : observer.error(result.data);
      }, err => {
        observer.error(this.requestFailedHandle(url, options, err));
      });
    });
  }


  public get(url: string, paramMap: any = null): Observable < any > {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Get,
      search: HttpService.buildURLSearchParams(paramMap)
    }));
  }

  public post(url: string, body: any = {}): Observable < any > {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: body,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }));
  }

  public postFormData(url: string, paramMap: any = null): Observable < any > {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: HttpService.buildURLSearchParams(paramMap).toString(),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }));
  }

  public put(url: string, body: any = {}): Observable < any > {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Put,
      body: body,
      headers: new Headers({
        'ACCESS_TOKEN': this.getToken()
      })
    }));
  }

  public delete(url: string, paramMap: any = null): Observable < any > {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Delete,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public patch(url: string, body: any = {}): Observable < any > {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Patch,
      body: body
    }));
  }


  /**
   * 处理请求成功事件
   */
  requestSuccessHandle(url: string, options: RequestOptionsArgs, res: Response) {
    this.nativeService.hideLoading();
      try {
        let json = res.json();
        return {
          success: true,
          data: json
        };
      } catch (error) {
        let json = {};
        return {
          success: true,
          data: json
        };
      }
  }


  /**
   * 处理请求失败事件
   */
  private requestFailedHandle(url: string, options: RequestOptionsArgs, err: Response) {
    this.nativeService.hideLoading();
    if (err instanceof TimeoutError) {
      this.nativeService.alert('请求超时,请稍后再试!');
    } else if (!this.nativeService.isConnecting()) {
      this.nativeService.alert('请连接网络');
    } else {
      let status = err.status;
      let msg = '请求发生异常';
      if (status === 0) {
        msg = '请求失败，请求响应出错';
      } else if (status === 404) {
        msg = '请求失败，未找到请求地址';
      } else if (status === 500) {
        msg = '请求失败，服务器出错，请稍后再试';
      } else if (status === 401) {
      }
      if (msg ! =''){
        this.nativeService.alert(msg);
      }
    }
    return err;
  }

  /**
   * 将对象转为查询参数
   */
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      params.set(key, val);
    }
    return params;
  }


}
