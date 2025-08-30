import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';
import { ActivityLog } from 'src/app/interfaces/seg_activity_log';
import { ActivityLogService } from 'src/app/services/activitylog.service';

export function snackBarError(): MatSnackBarConfig {
  let config = new MatSnackBarConfig();
  config.verticalPosition = 'bottom';
  config.horizontalPosition = 'center';
  config.duration = 4000;
  config.panelClass = 'red-snackbar';
  return config;
}

export function snackBarOk(): MatSnackBarConfig {
  let config = new MatSnackBarConfig();
  config.verticalPosition = 'bottom';
  config.horizontalPosition = 'center';
  config.duration = 4000;
  config.panelClass = 'green-snackbar';
  return config;
}

export function Encriptar(value) {
  // let encryptText = '';
  const key = 'ashproghelpdotnetmania2022key123'; // 'clave@clave.com';
  // let encriptValue = '';

  return CryptoJS.AES.encrypt(value, key).toString();

  // encriptValue = CryptoJS.AES.encrypt(value, decPassword).toString();
  // console.log(encriptValue);
  // console.log(CryptoJS.AES.decrypt(encriptValue, decPassword).toString(CryptoJS.enc.Utf8));
}

export function Desencriptar(value) {
  // let encryptText = '';
  const key = 'ashproghelpdotnetmania2022key123'; // 'clave@clave.com';
  // let encriptValue = '';

  return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8);

  // encriptValue = CryptoJS.AES.encrypt(value, decPassword).toString();
  // console.log(encriptValue);
  // console.log(CryptoJS.AES.decrypt(encriptValue, decPassword).toString(CryptoJS.enc.Utf8));
}
