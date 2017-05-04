import { RsvpModel } from './rsvp.model';

export class EventModel {
  constructor(
    public _id: String,
    public title: String,
    public location: String,
    public startDatetime: Date,
    public endDatetime: Date,
    public viewPublic: Boolean,
    public description?: String,
    public rsvps?: Array<RsvpModel>
  ) { }
}
