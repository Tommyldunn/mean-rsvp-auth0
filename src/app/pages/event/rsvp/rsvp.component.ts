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
  @Input() eventId: string;
  userRsvp: RsvpModel;
  totalAttending = 0;
  showEditForm = false;
  editBtnText = 'Edit RSVP';

  constructor(
    public auth: AuthService,
    public utils: UtilsService) { }

  ngOnInit() {
    this._getUserRsvpAndGuests();
  }

  private _getUserRsvpAndGuests() {
    if (this.rsvps.length) {
      this.rsvps.forEach(rsvp => {
        // If user ID is in RSVPs, set as user's RSVP
        if (rsvp.userId === this.auth.userProfile.sub) {
          this.userRsvp = rsvp;
        }
        // Count total number of guests across all RSVPs
        if (rsvp.guests) {
          this.totalAttending += rsvp.guests;
        }
      });
    }
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
    this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit RSVP';
  }

}
