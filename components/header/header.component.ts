import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = 'ASWWU';
  @Input() invertColor: boolean = false;
  @Input() tileImage: string = null;
  @Input() admin: boolean = false;
  @Input() adminLink: string = null;
  @Input() imageUrl: string = null;

  // style used by ngStyle
  style: Object = {
    'background-image': `url(${this.imageUrl})`,
  };

  constructor() { }

  ngOnInit() {
  }

}
