import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  message: any;
  constructor(
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    // this function waits for a message from alert service, it gets
    // triggered when we call this from any other component
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

}
