import {Injectable, EventEmitter} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WindowSizeService
{
  width: number;
  height: number;
  onResize: EventEmitter<any>;

  constructor()
  {
    var self = this;

    this.updateSizes();
    this.onResize = new EventEmitter();

    window.addEventListener("resize", function($event) { self.handleResize($event) });
  }

  handleResize($event)
  {
    this.updateSizes();
    this.onResize.emit($event);
  }

  updateSizes()
  {
    this.width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    this.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
  }
}
