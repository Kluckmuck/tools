export class Booking {
    public constructor(init?: Partial<Booking>) {
        Object.assign(this, init);
    }
    id: number;
    date: Date = new Date();
    time: Date = new Date();
    location: string;
    comment: string;
    operator: number;
}