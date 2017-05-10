import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { UtilsService } from './../../../core/utils.service';
import { FilterSortService } from './../../../core/filter-sort.service';
import { RsvpModel } from './../../../core/models/rsvp.model';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  @Input() rsvps: RsvpModel[] = [];
  @Input() eventId: string;
  @Input() eventPast: boolean;
  userRsvp: RsvpModel;
  totalAttending: number;
  footerTense: string;
  showEditForm = false;
  editBtnText = 'Edit My RSVP';
  showAllRsvps = false;
  showRsvpsText = 'View All RSVPs';

  constructor(
    public auth: AuthService,
    public utils: UtilsService,
    public fs: FilterSortService) { }

  ngOnInit() {
    this._updateRsvpState();
    this.footerTense = !this.eventPast ? 'plan to attend this event.' : 'attended this event.';
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit RSVP';
  }

  toggleShowRsvps() {
    this.showAllRsvps = !this.showAllRsvps;
    this.showRsvpsText = this.showAllRsvps ? 'Hide RSVPs' : 'Show All RSVPs';
  }

  onSubmitRsvp(e) {
    if (e.rsvp) {
      this.userRsvp = e.rsvp;
      this._updateRsvpState(true);
      this.toggleEditForm(false);
    }
  }

  private _updateRsvpState(changed?: boolean) {
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
    this._setUserRsvpGetAttending(changed);
  }

  private _setUserRsvpGetAttending(changed?: boolean) {
    // Iterate over RSVPs to get/set user's RSVP
    // and get total number of attending guests
    let guests = 0;

    this.rsvps.forEach((rsvp, i) => {
      // If user has an existing RSVP
      if (rsvp.userId === this.auth.userProfile.sub) {
        if (changed) {
          // If user edited their RSVP, update array with edited data
          this.rsvps[i] = this.userRsvp;
        } else {
          // If no changes were made, set local user RSVP property
          // (This applies on ngOnInit)
          this.userRsvp = rsvp;
        }
      }
      // Count total number of guests who have RSVPed
      if (this.rsvps[i].guests) {
        guests += this.rsvps[i].guests;
      }
    });

    // Set updated guest count
    this.totalAttending = guests;
  }

}
