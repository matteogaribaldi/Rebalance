import { Component, OnInit } from '@angular/core';
import { ETF } from './ETF';
import { Asset } from '../asset';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  numberAssets = 0;
  totalValue = 0;

  options = ETF

  assetList: Asset[] = [];

  constructor() { }

  ngOnInit(): void {
    this.assetList[0] = new Asset();

  }

  public onInput(e: any, pos: number): void {
    let find = this.options.find(x => x?.Name === e.target.value);
    console.log(find?.Ticker);
    this.assetList[pos].name = find?.Name;
    this.assetList[pos].currentPrice = pos + 1 * 100;
    this.updateTotal(pos);
    this.calculateTotalQuantity();
    this.updateAllRatios();
  }

  public updateTable(e: any, pos: number): void {
    this.updateTotal(pos);
    this.calculateTotalQuantity();
    this.updateAllRatios();
  }

  updateAllRatios() {
    this.assetList.forEach((lot: any) => {
      lot.ratio = Math.round((lot.totalPrice  / this.totalValue)*100*10)/10;
    });
  }

  public updateTotal(pos: number) {
    this.assetList[pos].totalPrice = this.assetList[pos].number * this.assetList[pos].currentPrice;
  }

  calculateTotalQuantity() {
    this.totalValue = 0;
    this.assetList.forEach((lot: any) => {
      this.totalValue += lot.totalPrice;
    });
  }

  row = [
    {
      id: '',
      name: '',
      email: ''
    }
  ];

  addTable() {
    const obj = {
      id: '',
      name: '',
      email: ''
    }
    this.row.push(obj)
    this.numberAssets += 1;
    this.assetList[this.numberAssets] = new Asset();
  }

  deleteRow(x: number) {
    var delBtn = confirm(" Do you want to remove the asset ?");
    if (delBtn == true) {
      this.row.splice(x, 1);
      this.assetList = this.assetList.filter((_, index) => index !== x);
      //this.assetList.slice(x, 1);
      this.numberAssets -=  1;
      this.calculateTotalQuantity();
      this.updateAllRatios();
    }

  }

}
