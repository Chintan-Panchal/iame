import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Subscription } from 'rxjs';
import { LoggerService } from '../../../services/logger/logger.service';
import { StateService, UserStateData } from '../../../@core/data/state.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  user: any;
  subscription: Subscription;
  userMenu = [{ title: 'Edit Profile' }, { title: 'Log out' }];
  notification = [{ title: '' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private analyticsService: AnalyticsService,
    private logger: LoggerService,
    private stateService: StateService,
  ) {
    this.logger.info('contructing HeaderComponent');
  }

  ngOnInit() {
    this.subscription = this.stateService.state$.subscribe((userData: UserStateData) => {
      this.logger.info('received user logged in', userData);
      this.user = userData
      this.user.name = userData.email;
    });
  }

  OnDestroy() {
    this.logger.info('header component destroyed');
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

}
