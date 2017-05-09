import { RsvpModel } from './rsvp.model';

export class EventModel {
  constructor(
    public title: string,
    public location: string,
    public startDatetime: Date,
    public endDatetime: Date,
    public viewPublic: boolean,
    public description?: string,
    public rsvps?: Array<RsvpModel>,
    public _id?: string, // _id is present if editing or returning from DB
  ) { }
}
