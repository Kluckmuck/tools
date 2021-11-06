export class Message {
  public constructor(init?: Partial<Message>) {
    Object.assign(this, init);
  }
  booking: number;
  created_on: Date;
  body: string;
  name: string;
}
