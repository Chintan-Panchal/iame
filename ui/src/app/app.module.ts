import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth-guard.service';
import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PropertyService } from './services/property/property.service';
import { LoggerService } from './services/logger/logger.service';
import { ConsoleLoggerService } from './services/logger/console-logger.service';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken } from '@nebular/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import * as Raven from 'raven-js';
import { ToastrModule } from 'ngx-toastr';
import { CleanGuard } from './clean-guard.guard';
import { LivechatWidgetModule } from '@livechat/angular-widget';
import { JGAuthModule } from './auth/auth.module';

Raven
  .config('https://9a40be8ffb9149939d9a5bf3d04fbc29@sentry.io/1207129')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    LivechatWidgetModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    JGAuthModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    Ng4LoadingSpinnerModule,
    ToastrModule.forRoot(),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            baseEndpoint: environment.baseApiUrl,
            token: {
              key: 'headerValue',
              // getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
              // this.getConfigValue('token.key')),
            },
            login: {
              endpoint: '/login',
            },
          },
        },
      },
      forms: {
        login: {
          redirectDelay: 500,
          // delay before redirect after a successful login, while success message is shown to the user
          provider: 'email',
          // provider id key. If you have multiple providers, or what to use your own
          rememberMe: true,
          // whether to show or not the `rememberMe` checkbox
          showMessages: {
            // show/not show success/error messages
            success: true,
            error: true,
          },
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },
    { provide: LoggerService, useClass: ConsoleLoggerService },
    AuthGuard,
    CleanGuard,
    AuthService,
    PropertyService,
  ],
  entryComponents: [],
})
export class AppModule {
}
