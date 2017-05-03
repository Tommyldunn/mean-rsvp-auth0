import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;

  constructor(private auth: AuthService, private api: ApiService) { }

  ngOnInit() {
    this.authSubscription = this.auth.loggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.api
          .getAuthorized$()
          .subscribe(
            (res) => console.log(res)
          );

        if (this.auth.isAdmin) {
          this.api
            .getAdmin$()
            .subscribe(
              (res) => console.log(res)
            );
        }
      }
    });
    
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    // @TODO: destroy API subscriptions too
  }

}
