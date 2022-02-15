import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private secretKey: string;

  private passwordEncrypted: any = "";

  private key: any;

  constructor() {
    this.secretKey = environment.secretPassword;
    this.key = CryptoJS.enc.Utf8.parse(this.secretKey);

  }

  encryptUsingAES256(password: string): void {

    let encrypted = CryptoJS.AES.encrypt(password, this.secretKey, {
      keySize: 16,
      iv: this.key,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    this.passwordEncrypted = encrypted.toString();
    localStorage.setItem('SPC-pass', this.passwordEncrypted);
    
  }

  decryptUsingAES256() {

    this.passwordEncrypted = localStorage.getItem('SPC-pass');

    let dataEncrypt = CryptoJS.AES.decrypt(this.passwordEncrypted, this.secretKey, {
      keySize: 16,
      iv: this.key,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

    return dataEncrypt.replace(/["]/g, '');

  }

}
