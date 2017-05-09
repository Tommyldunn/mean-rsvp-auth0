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
  @Input() rsvps: RsvpModel[] = [];
  @Input() eventId: string;
  userRsvp: RsvpModel;
  totalAttending: number;
  showEditForm = false;
  editBtnText = 'Edit RSVP';

  constructor(
    public auth: AuthService,
    public utils: UtilsService) { }

  ngOnInit() {
    this._getRsvp();
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit RSVP';
  }

  onSubmitRsvp(e) {
    if (e.rsvp) {
      this.userRsvp = e.rsvp;
      this._getRsvp(true);
    }
  }

  private _getRsvp(changed?: boolean) {
    let guests = 0;

    // If RSVP matching user ID is already
    // in RSVP array, set as initial RSVP
    const _initialUserRsvp = this.rsvps.filter(rsvp => {
        return rsvp.userId === this.auth.userProfile.sub;
      })[0];

    // If user has not RSVPed before and has
    // made a change, push new RSVP to array
    if (!_initialUserRsvp && this.userRsvp && changed) {
      this.rsvps.push(this.userRsvp);
    }
    
    // If user has an existing RSVP
    this.rsvps.forEach((rsvp, i) => {
      if (_initialUserRsvp) {
        if (changed) {
          // If user edited their RSVP, update array with edited data
          this.rsvps[i] = this.userRsvp;
        } else {
          // If no changes were made, set local user RSVP property
          this.userRsvp = rsvp;
        }
      }
      // Count total number of guests across all RSVPs
      if (this.rsvps[i].guests) {
        guests += this.rsvps[i].guests;
      }
    });

    this.totalAttending = guests;
    this.toggleEditForm(false);
  }

}
