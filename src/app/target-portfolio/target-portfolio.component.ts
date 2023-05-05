import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Asset } from '../asset';
import { TargetPortfolioService } from './target-portfolio.service';


@Component({
  selector: 'app-target-portfolio',
  templateUrl: './target-portfolio.component.html',
  styleUrls: ['./target-portfolio.component.css'],
  providers: [TargetPortfolioService]
})
export class TargetPortfolioComponent implements OnInit {

  @Input() assetList!: Asset[];

  title = 'Rebalance';

  minRebalance = 0;
  addedCash = 0;
  showResult = false;

  constructor(private targetportfolioService: TargetPortfolioService) { 
  }

  ngOnInit(): void {
    this.updateMinRebalance();
    
  }

  updateMinRebalance() {
    //this.minRebalance = this.targetportfolioService.getMinRebalance(this.assetList);
     // Calcolo del portafoglio totale
     const totalPortfolioValue = this.assetList.reduce(
      (total, asset) => total + asset.currentPrice * asset.currentQuantity,
      0
    );

    // Calcolo dell'ammontare minimo di denaro necessario per ogni asset
   /* const amountNeededForEachAsset = this.assetList.map(ass => {
      const targetValue = totalPortfolioValue * (ass.targetRatio/100);
      const currentValue = ass.currentPrice * ass.currentQuantity;
      const currentTargetDiff = targetValue - currentValue;
      const amountNeeded = currentTargetDiff > 0 ? currentTargetDiff : 0;
      
      return { name: ass.name, amountNeeded };
    });*/
    for(var i = 0; i<this.assetList.length; i++){
      const targetValue = totalPortfolioValue * (this.assetList[i].targetRatio/100);
      const currentValue = this.assetList[i].currentPrice * this.assetList[i].currentQuantity;
      const currentTargetDiff = targetValue - currentValue;
      const amountNeeded = currentTargetDiff > 0 ? currentTargetDiff : 0;
      this.assetList[i].calculatedTargetNumber = Math.floor(amountNeeded / this.assetList[i].currentPrice);
      this.assetList[i].calculatedTargetDelta = this.assetList[i].calculatedTargetNumber * this.assetList[i].currentPrice;
      this.assetList[i].calculatedTotalValue = (this.assetList[i].currentQuantity + this.assetList[i].calculatedTargetNumber)
      * this.assetList[i].currentPrice;
    }

    
    // Calcolo dell'ammontare totale necessario
    const totalAmountNeeded = this.assetList.reduce(
      (total, asset) => total + asset.calculatedTargetDelta,
      0
    );

    //Calcolo portafoglio target

    console.log(`L'ammontare minimo di denaro necessario è ${totalAmountNeeded}`);
    this.minRebalance = totalAmountNeeded;



    this.printPortfolio();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['assetList'].currentValue != changes['assetList'].previousValue) {
      this.updateMinRebalance();
      this.showResult = false;
    } 
  }

  Rebalance() {
    this.showResult = true;
    this.targetportfolioService.getRebalancedPortfolio(this.addedCash, this.assetList).subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          this.assetList[i] = data[i];
        }
      }
    )
  }

  printPortfolio(){
    for (let i = 0; i < this.assetList.length; i++) {
      console.log("asset"+i+" "+JSON.stringify(this.assetList[i]));
    }
  }

    Rebalance2() {
      
     // rebalancePortfolio(this.addedCash,this.assetList);
      }

}
