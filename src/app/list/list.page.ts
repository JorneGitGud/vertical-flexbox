import { AfterContentInit, AfterViewChecked, Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements AfterViewChecked, AfterViewInit {

  list={
    yellow:'full',
    yellowMin: false,
    blue:'small',
    blueMin:true,
    red:'max',
    redMin:false,
    green:'small',
    greenMin: false
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

  onCollapse(name:string){
    this.list[name]=!this.list[name];
  }

  onSetSize(name:string, size:string){

    console.log(name + " : " + size)

    this.list[name+'Min'] = false;

    this.list[name]=size;


  }
}
