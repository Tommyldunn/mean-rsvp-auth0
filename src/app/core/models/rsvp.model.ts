export class RsvpModel {
  constructor(
    public userId: string,
    public name: string,
    public eventId: string,
    public attending: boolean,
    public _id?: string, // _id is present if editing or returning from DB
    public guests?: number,
    public comments?: string
  ) { }
}
