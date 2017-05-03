import { RsvpModel } from './rsvp.model';

export class EventModel {
  constructor(
    public _id: string,
    public title: string,
    public location: string,
    public startDatetime: Date,
    public endDatetime: Date,
    public viewPublic: boolean,
    public description?: string,
    public rsvps?: Array<RsvpModel>
  ) { }
}
