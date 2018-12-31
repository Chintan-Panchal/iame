import { Injectable } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();

  constructor() {
  }

  confirmThis(message: string, siFn: () => void, noFn: () => void) {
    this.setConfirmation(message, siFn, noFn);
  }

  setConfirmation(message: string, siFn: () => void, noFn: () => void) {
    this.subject.next({
      type: 'confirm',
      text: message,
      siFn:
        () => {
          this.subject.next(); // this will close the modal
          siFn();
        },
      noFn: () => {
        this.subject.next();
        noFn();
      },
    });

  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
