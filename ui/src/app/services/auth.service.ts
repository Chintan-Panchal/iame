
import { of as observableOf, Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggerService } from './logger/logger.service';
import { StateService, UserStateData } from '../@core/data/state.service';
import { TwoFactorAuth } from '../models/two-factor-auth.model';

@Injectable()
export class AuthService {

  constructor(
    protected http: HttpClient,
    private logger: LoggerService,
  ) {
    this.logger.info('auth service constructed');
  }

  /**
 * Sign outs with the selected provider
 * Removes token from the token storage
 *
 * Example:
 * logout('email')
 *
 * @param provider
 * @returns {Observable<NbAuthResult>}
 */
  logout() {
    this.logger.info('logout called');
    sessionStorage.setItem('isAuthenticated', 'false');
    return observableOf(false);
  }

  /**
 * Returns true if auth token is presented in the token storage
 * @returns {Observable<any>}
 */
  isAuthenticated(): Observable<boolean> {
    this.logger.info('=>isAuthenticated');
    const isAuth = sessionStorage.getItem('isAuthenticated');
    if (isAuth === 'true') {
      return observableOf(true);
    }
    return observableOf(false);

  }


  verifyTwoFactorSecret(auth: TwoFactorAuth): Observable<boolean> {
    return this.http.request<boolean>('POST',
      `${environment.baseApiUrl}/auth/confirm-two-factor`, { body: auth });
  }

  requireTwoFactor(auth: TwoFactorAuth): Observable<TwoFactorAuth> {
    return this.http.request<any>('POST',
      `${environment.baseApiUrl}/auth/requires-two-factor`, { body: auth });
  }
}
