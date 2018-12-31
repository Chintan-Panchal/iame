import { isNullOrUndefined } from 'util';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export function urlBase64Decode(str: string): string {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0: { break; }
    case 2: { output += '=='; break; }
    case 3: { output += '='; break; }
    default: {
      throw new Error('Illegal base64url string!');
    }
  }
  return b64DecodeUnicode(output);
}

export function b64decode(str: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output: string = '';

  str = String(str).replace(/=+$/, '');

  if (str.length % 4 === 1) {
    throw new Error(`'atob' failed: The string to be decoded is not correctly encoded.`);
  }

  for (
    // initialize result and counters
    let bc: number = 0, bs: any, buffer: any, idx: number = 0;
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}

// https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
export function b64DecodeUnicode(str: any) {
  return decodeURIComponent(Array.prototype.map.call(b64decode(str), (c: any) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export function getNamesFromFullName(fullName: string): any {
  const names = fullName.split(' ');
  let firstName = fullName;
  let middleName = '';
  let lastName = '';
  if (names.length > 0) {
    firstName = names[0];
    if (names.length > 2) {
      let start = 1;
      const end = names.length - 1;
      lastName = names[end];

      middleName = names[start++];

      while (start < end) {
        middleName = middleName + ' ' + names[start++];
      }
    } else {
      lastName = names[1];
    }
  }

  return { firstName: firstName, middleName: middleName, lastName: lastName };
}

export function getFullNameFromNames(firstName?: string, middleName?: string, lastName?: string): string {
  const fName = !isNullOrUndefined(firstName) && firstName.length > 0 ? firstName + ' ' : '';
  const mName = !isNullOrUndefined(middleName) && middleName.length > 0 ? middleName + ' ' : '';
  const lName = !isNullOrUndefined(lastName) && lastName.length > 0 ? lastName : '';
  return fName + mName + lName;
}

export function extractExtensionFromActionData(actionData: string): any {
  const parts = actionData.split(' ');
  return {
    extension: parts[0],
    tech: parts[1],
    domain: parts[2],
  };
}

export class ToasterShow {
  constructor(
    private toasterService: ToastrService,
  ) {
  }
  showError(error, log) {
    try {
      environment.debug && console.log(log + ' :' + error + ' : ' + error.message);
      let errorMessage = error.message;
      if (typeof error.error !== 'undefined' && error.error[0] != null && error.error[0].description != null) {
        errorMessage = error.error[0].description;
      } else if (typeof error.message !== 'undefined' && error.message != null
        && errorMessage.toLowerCase().indexOf('timeout') !== 1) {
        errorMessage = 'Timeout. Check your internet connection and if the transaction went through. If not try again: ' + error.message;
      } else if (typeof error.message !== 'undefined' && error.message != null
        && error.message.toLowerCase().indexOf('unknown') !== 1) {
        errorMessage = 'Please check your internet connection: ' + error.message;
      } else if (errorMessage == null || typeof errorMessage === 'undefined') {
        errorMessage = log;
      }
      this.toasterService.error(errorMessage);
    } catch (e) {
      console.error('Error showing error: ' + e);
    }
  }
}

