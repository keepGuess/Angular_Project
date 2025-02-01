import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import {
  ChildrenOutletContexts,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user.component.html',
  styles: ``,
  animations:[
      trigger('routerFadeIn', [
         transition('*<=>*', [
           query(':enter', [
             style({ opacity: 0 }),
             animate('is ease-in-out', style({ opacity: 1 }))
           ], { optional: true }),
         ])
      ])
  ]
})
export class UserComponent {

  constructor(private context: ChildrenOutletContexts) {}

  getRouteUrl() {
    return this.context.getContext('primary')?.route?.url;
  }

}
