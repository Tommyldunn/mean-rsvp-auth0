import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Route guards
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
// Page components
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { EventComponent } from './pages/event/event.component';
import { MyRsvpsComponent } from './pages/my-rsvps/my-rsvps.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CreateEventComponent } from './pages/admin/create-event/create-event.component';
import { UpdateEventComponent } from './pages/admin/update-event/update-event.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'event/:id',
    loadChildren: './pages/event/event.module#EventModule',
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'my-rsvps',
    component: MyRsvpsComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'admin',
    loadChildren: './pages/admin/admin.module#AdminModule',
    canActivate: [
      AuthGuard,
      AdminGuard
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    AuthGuard,
    AdminGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
