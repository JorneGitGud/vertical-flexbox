import { AfterContentInit, AfterViewChecked, Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements AfterViewChecked, AfterViewInit {

  list={
    yellow:'full',
    blue:'min',
    red:'max',
    green:'small'
  }

  containerHeight :number =0;
  usedHeight: number=0;
  maxHeight: number = 350;
  redPaneContentHeight;

  checkedHeights: boolean = false;

  @ViewChild('paneslist') panesList: ElementRef;
  @ViewChild('yellowpane') yellowPane: ElementRef;
  @ViewChild('bluepane') bluePane: ElementRef;
  @ViewChild('redpane') redPane: ElementRef;
  @ViewChild('greenpane') greenPane: ElementRef;
  root = document.documentElement;

  constructor() {
    this.root.style.setProperty('--max', this.maxHeight+"px")
  }

  ngAfterViewChecked(): void {
   this.getHeights();
  }
  ngAfterViewInit(): void {
  //  this.getHeights();
  }

  test(){
    console.log(this.maxHeight);
  }

  getHeights(){
    console.log('get heights')
    this.containerHeight  =  this.panesList.nativeElement.offsetHeight;
    this.usedHeight       =  this.yellowPane.nativeElement.offsetHeight
                          + this.bluePane.nativeElement.offsetHeight
                          + (this.greenPane.nativeElement.offsetHeight/1.5);

    this.calculatedMaxHeight(this.containerHeight, this.usedHeight);
  }

  calculatedMaxHeight(containerHeight, usedHeight){
    this.maxHeight = (containerHeight - usedHeight);
    this.root.style.setProperty('--max', this.maxHeight+'px')

    this.checkedHeights=true;

  }

  onToggleSize(name:string, size: string){
    if(!(this.list[name]==size)){
      this.list[name]=size;
    }
    else{
      switch (this.list[name]) {
        case 'min':
          this.list[name]='small'
          break;
        case 'small':
          this.list[name]='min'
          break;
        case 'max':
          this.list[name]='full'
          break;
        case 'full':
          this.list[name]='small'
          break;

        default:
          break;
      }
    }
  }
}
