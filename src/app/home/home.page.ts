import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  list={
    blue:'norm',
    yellow:'norm',
    green:'norm',
    red:'none'
  }

  containerHeight =90;
  headerHeight = 5;
  maxHeight = 10;
  normHeight = 15;
  minHeight = 5;

  root = document.documentElement;

  constructor() {
    this.calculateMaxHeightVariable()
  }

  onToggleMin(name:string){
    if(this.list[name]=='min'){
      this.list[name]='norm'
    }
    else{
      this.list[name]='min'
    }
    this.calculateMaxHeightVariable()
  }

  onToggleMax(name:string){
    if(this.list[name]=='max'){
      this.list[name]='norm'
    }
    else{
      this.list[name]='max'
    }
    this.calculateMaxHeightVariable()
  }

  calculateMaxHeightVariable(){
    let usedHeight=0;
    let numOfMaxPanes=0;
    for(var name in this.list){

      if(this.list[name]=='max'){
        numOfMaxPanes++;
        usedHeight+=this.headerHeight;
      }

      if(this.list[name]=='norm'){
        usedHeight+=this.normHeight;
        usedHeight+=this.headerHeight;
      }

      if(this.list[name]=='min'){
        usedHeight+=this.minHeight;
        usedHeight+=this.headerHeight;
      }
    }

    if(numOfMaxPanes>0){
      this.maxHeight = (this.containerHeight-usedHeight)/numOfMaxPanes;
    }
    else{
      this.maxHeight = 20;
    }
    this.root.style.setProperty('--max', this.maxHeight+'vh')
    console.log(this.root.style.getPropertyValue('--max'));
  }

}
