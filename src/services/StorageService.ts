import {
  Injectable
} from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {}
  getStorageType = (type) => {
    switch (type) {
      case 'session':
        return 'sessionStorage';
      case 'local':
        return 'localStorage';
      default:
        return 'localStorage';
    }
  }

  set = (key, data, type) => {
    let storageType = this.getStorageType(type);
    window[storageType].setItem(key, JSON.stringify(data))
  }
  get = (key, type) => {
    let storageType = this.getStorageType(type);
    return JSON.parse(window[storageType].getItem(key));
  }
  remove = (key, type) => {
    var storageType = this.getStorageType(type);
    window[storageType].removeItem(key);
  }
  setCookie = (c_name, value, expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + decodeURI(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString())
}

  getCookie = (c_name) =>  {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=")
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        var c_end = document.cookie.indexOf(";", c_start)
        if (c_end == -1) c_end = document.cookie.length
        return decodeURIComponent(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  }
}
