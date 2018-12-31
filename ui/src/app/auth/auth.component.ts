import { Component } from '@angular/core';

@Component({

  selector: 'ngx-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
  <nb-layout>
  <nb-layout-column>
    <nb-card>
      <nb-card-body>
        <div class="flex-centered col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <router-outlet></router-outlet>
        </div>
      </nb-card-body>
    </nb-card>
  </nb-layout-column>
</nb-layout>`,
})
export class JGAuthComponent {
}
