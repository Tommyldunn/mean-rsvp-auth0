export class RsvpModel {
  constructor(
    public _id: String,
    public userId: String,
    public name: String,
    public eventId: String,
    public attending: Boolean,
    public guests?: Number,
    public comments?: String
  ) { }
}
