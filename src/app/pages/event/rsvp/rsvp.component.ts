import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { UtilsService } from './../../../core/utils.service';
import { RsvpModel } from './../../../core/models/rsvp.model';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  @Input() rsvps: RsvpModel[];
  userRsvp: RsvpModel;

  constructor(
    public auth: AuthService,
    public utils: UtilsService
    ) { }

  ngOnInit() {
    this.userRsvp = this._getUserRsvp();
  }

  private _getUserRsvp() {
    if (this.rsvps.length) {
      for (let i = 0; i < this.rsvps.length; i++) {
        const thisRsvp = this.rsvps[i];

        if (thisRsvp.userId === this.auth.userProfile.sub) {
          return thisRsvp;
        }
      }
    }
  }

}
