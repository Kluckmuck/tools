export class Booking {
    public constructor(init?: Partial<Booking>) {
        Object.assign(this, init);
    }
    id: number;
    date: Date = new Date();
    time: Date = new Date();
    createdDate: Date;
    location: string;
    comments: string;
    operator: number;
    status: string;
}