import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap ,  catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { of as observableOf ,  Observable } from 'rxjs';
import { LoggerService } from './services/logger/logger.service';

@Injectable()
export class CleanGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private auth: AuthService,
    private logger: LoggerService) {
  }

  canActivate(): Observable<boolean> {
    this.logger.info('clean guard called');
    return observableOf(true);
  }
}
