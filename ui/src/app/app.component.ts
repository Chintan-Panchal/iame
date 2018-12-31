import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbMenuService } from '@nebular/theme';
import { takeWhile, map, concatMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { LoggerService } from './services/logger/logger.service';
import { StateService } from './@core/data/state.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { of } from 'rxjs';
import { isNullOrUndefined } from 'util';

declare var $;
declare let ga: Function;

@Component({
  selector: 'ngx-app',
  template: `<router-outlet></router-outlet>
  <ng4-loading-spinner></ng4-loading-spinner>
  <livechat-widget [licenseId]="licenseId"></livechat-widget>`,
})

export class AppComponent implements OnInit {
  private alive: boolean = true;
  licenseId = 9932015;

  constructor(
    private router: Router,
    private authService: AuthService,
    private analytics: AnalyticsService,
    private menuService: NbMenuService,
    private logger: LoggerService,
    private stateService: StateService,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // ga('set', 'page', event.urlAfterRedirects);
        // ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    this.analytics.trackPageViews();
    this.logger.info('Main app loading');
    this.menuService.onItemClick().pipe(
      takeWhile(() => this.alive))
      .subscribe((data) => {
        // jquery  for closing pop-over.
        let tempElement = $('nb-popover > nb-context-menu .menu-item');
        tempElement.click(function () {
          $('nb-popover').hide();
        });
        this.logger.info('menu item clicked', data);
        // this.contextMenu.hide();
        if (data.item.title === 'Log out') {
          this.spinnerService.show();
          this.authService.logout().subscribe((res) => {

            if (res != null) {
              this.logger.info('successfully logged out');
              setTimeout(() => {
                this.spinnerService.hide();
                this.logger.info('timeout =>');
                this.router.navigateByUrl('/auth/login');
              }, 2000);
            } else {
              this.logger.error('failed to logout...');
              setTimeout(() => {
                this.spinnerService.hide();
                this.logger.info('timeout =>');
                this.router.navigateByUrl('/auth/login');
              }, 2000);
            }
          });
        } else if (data.item.title === 'Edit Profile') {
          this.logger.info('redirect to profile page');
          this.router.navigateByUrl(`/pages/users/profile`);
        }
      });
  }

  onDestroy() {
    this.alive = false;
    this.logger.info('main app destroyed');
  }
}
