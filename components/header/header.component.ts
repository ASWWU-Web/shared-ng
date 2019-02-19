import { Component, Input, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';

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

  constructor() { }

  ngOnInit() {
  }

}
