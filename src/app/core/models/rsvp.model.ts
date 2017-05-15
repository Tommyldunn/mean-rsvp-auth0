export class RsvpModel {
  constructor(
    public userId: string,
    public name: string,
    public eventId: string,
    public attending: boolean,
    public guests?: number | string,
    public comments?: string,
    public _id?: string, // _id is present if editing or returning from DB
  ) { }
}
