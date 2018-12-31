import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of as observableOf, Observable } from 'rxjs';
import { LoggerService } from './services/logger/logger.service';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private logger: LoggerService) {
  }

  canActivate(): Observable<boolean> {
    this.logger.info('auth guard called');

    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.logger.info('not authenticated');
            this.router.navigate(['auth/login']);
          }
        }),
        catchError((d) => {
          this.router.navigate(['auth/login']);
          return observableOf(false);
        }),
      )
  }
}
