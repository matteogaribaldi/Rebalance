export class Asset {
    name: string | undefined;
    currentPrice: number;
    currentQuantity: number;
    totalValue: number;
    ratio: number;
    targetRatio: number;
    calculatedTargetNumber: number;
    calculatedTargetDelta: number;
    calculatedTotalValue: number;
    calculatedRealTargetAllocation: number;

    constructor() {
        this.name = "";
        this.currentPrice = 0;
        this.currentQuantity = 1;
        this.totalValue = 0;
        this.ratio = 0;
        this.targetRatio = 0;
        this.calculatedTargetNumber = 0;
        this.calculatedTargetDelta = 0;
        this.calculatedTotalValue = 0;
        this.calculatedRealTargetAllocation = 0;
    }



}
