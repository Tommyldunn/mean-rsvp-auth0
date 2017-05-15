import { trigger, transition, style, animate, state } from '@angular/animations';
/*
  Component declaration:
    @Component({
      selector: 'app-anim',
      animations: [expandCollapse],
      templateUrl: './anim.component.html',
      styleUrls: ['./anim.component.scss']
    })
  Template:
    <div *ngIf="show" [@expandCollapse]>
*/
export const expandCollapse = trigger('expandCollapse', [
  state('*', style({'overflow-y': 'hidden'})),
  state('void', style({ 'overflow-y': 'hidden' })),
  transition('* => void', [
    style({height: '*'}),
    animate('250ms ease-out', style({height: 0}))
  ]),
  transition('void => *', [
    style({height: 0}),
    animate('250ms ease-in', style({height: '*'}))
  ])
]);
