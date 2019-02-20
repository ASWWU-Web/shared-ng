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
  @Input() imageUrl: string = 'https://static.wixstatic.com/media/de317edf9480039c6c4d425f78b91e1c.png/v1/crop/x_0,y_0,w_330,h_331/de317edf9480039c6c4d425f78b91e1c.png';

  // style used by ngStyle
  style: Object = {
    'background-image': 'url(' + this.imageUrl + ')',
  };

  constructor() { }

  ngOnInit() {
  }

}
