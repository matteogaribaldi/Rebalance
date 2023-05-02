export class Asset {
    name: string | undefined;
    currentPrice: number;
    currentQuantity: number;
    totalPrice: number;
    ratio: number;
    targetRatio: number;
    calculatedTargetNumber: number;
    calculatedTargetDelta: number;
    calculatedTotalPrice: number;

    constructor() {
        this.name = "";
        this.currentPrice = 0;
        this.currentQuantity = 1;
        this.totalPrice = 0;
        this.ratio = 0;
        this.targetRatio = 0;
        this.calculatedTargetNumber = 0;
        this.calculatedTargetDelta = 0;
        this.calculatedTotalPrice = 0;
    }



}
