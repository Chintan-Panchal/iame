import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { JGAuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    RouterModule,
    FileDropModule,
  ],
  declarations: [JGAuthComponent, LoginComponent],
  exports: [JGAuthComponent, LoginComponent],

  providers: [],
})
export class JGAuthModule { }
