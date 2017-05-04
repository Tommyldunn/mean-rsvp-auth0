export class RsvpModel {
  constructor(
    public _id: string,
    public userId: string,
    public name: string,
    public eventId: string,
    public attending: boolean,
    public guests?: number,
    public comments?: string
  ) { }
}
