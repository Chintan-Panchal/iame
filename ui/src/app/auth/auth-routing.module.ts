import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JGAuthComponent } from './auth.component';

const routes: Routes = [{
    path: '',
    component: JGAuthComponent,
    children: [{
        path: 'login',
        component: LoginComponent,
    },
    ],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    declarations: [],
    exports: [RouterModule],
})

export class JGAuthRoutingModule { }

export const routedComponents = [
    JGAuthComponent, LoginComponent,
];
