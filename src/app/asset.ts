export class Asset {
    name: string | undefined;
    currentPrice: number;
    number: number;
    totalPrice: number;
    ratio: number;

    constructor() {
        this.name = "";
        this.currentPrice = 0;
        this.number = 1;
        this.totalPrice = 0;
        this.ratio = 0;
    }



}
