import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  list={
    yellow:'full',
    blue:'min',
    red:'max',
    green:'small'
  }

  constructor() { }

  ngOnInit() {
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
