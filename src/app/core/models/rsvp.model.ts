export class RsvpModel {
  constructor(
    public _id: string,
    public userId: string,
    public userName: string,
    public eventId: string,
    public eventName: string,
    public attending: Boolean,
    public guests?: Number,
    public comments?: String
  ) { }
}
