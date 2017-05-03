export class RsvpModel {
  constructor(
    public _id: String,
    public userId: String,
    public userName: String,
    public eventId: String,
    public eventTitle: String,
    public attending: Boolean,
    public guests?: Number,
    public comments?: String
  ) { }
}
