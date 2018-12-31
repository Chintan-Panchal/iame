import { Component, OnInit } from '@angular/core';
import { StateService } from '../../@core/data/state.service';
import { LoggerService } from '../../services/logger/logger.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {

  constructor(
    private stateService: StateService,
    private logger: LoggerService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toasterService: ToastrService,
  ) {

  }

  ngOnInit() {

  }

}
