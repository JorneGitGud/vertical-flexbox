//https://toruskit.com/blog/how-to-get-element-bounds-without-reflow/

import { WindowSizeService } from './../services/windowSizeService';
import { AfterContentInit, AfterViewChecked, Component, ElementRef, ViewChild, AfterViewInit, Injectable } from '@angular/core';

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

  // windowsSizeService : WindowSizeService;

  containerHeight :number;
  usedHeight: number;
  maxHeight: number = 350;
  redPaneContentHeight;


  @ViewChild('paneslist') panesList: ElementRef;
  @ViewChild('yellowpane') yellowPane: ElementRef;
  @ViewChild('bluepane') bluePane: ElementRef;
  @ViewChild('redpane') redPane: ElementRef;
  @ViewChild('greenpane') greenPane: ElementRef;
  root = document.documentElement;

  //windowSizeService:WindowSizeService
  constructor( ) {
    this.root.style.setProperty('--max', this.maxHeight+"px")
  //  this.windowsSizeService = windowSizeService;
  //  this.windowsSizeService.onResize.subscribe($event => this.onResize());
  }

  // onResize(){
  //   this.setHeights();
  // }

  ngAfterViewChecked(): void {
   this.setHeights();
  }
  //offset height in variable
  //offset height reflow

  ngAfterViewInit(): void {
    // this.setHeights();
  }

  test(){
    console.log(this.maxHeight);
  }

  setHeights(){

    if(this.panesList.nativeElement.offsetHeight && this.panesList && (this.containerHeight != this.panesList.nativeElement.offsetHeight) ){
      console.log('method execution')
      this.containerHeight  =  this.panesList.nativeElement.offsetHeight;
      this.usedHeight       =  this.yellowPane.nativeElement.offsetHeight
      + this.bluePane.nativeElement.offsetHeight
      + this.greenPane.nativeElement.offsetHeight;

      this.calculateMaxHeight(this.containerHeight, this.usedHeight);
    }else{
      console.log('method call')
    }
  }

  calculateMaxHeight(containerHeight, usedHeight){
    this.maxHeight = (containerHeight - usedHeight);
    this.root.style.setProperty('--max', this.maxHeight+'px')
  }

  onCollapse(name:string){
    this.list[name]=!this.list[name];
  }

  onSetSize(name:string, size:string){

    this.list[name+'Min'] = false;

    this.list[name]=size;
  }
}
