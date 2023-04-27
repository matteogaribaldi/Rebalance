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
    this.targetportfolioService.getMinRebalance().subscribe (
      data => {
        this.minRebalance = data;
      }
    )
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("bb " + changes['assetList']);
    if (changes['assetList'].currentValue != changes['assetList'].previousValue) {
      this.updateMinRebalance();
      this.showResult = false;
    }
  }

  Rebalance() {
    this.showResult = true;
    this.targetportfolioService.getRebalancedPortfolio(this.addedCash,this.assetList).subscribe (
      data => {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          this.assetList[i] = data[i];
        }
      }
    )
    }

}
