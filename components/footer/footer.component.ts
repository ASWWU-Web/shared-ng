import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  departments = [
    'outdoors',
    'outdoors',
    'tread-shed',
    'atlas',
    'mountain-ash',
    'photo',
    'video',
    'collegian',
    'web',
    'marketing',
    'global-service',
    'spiritual',
    'social',
    'senate',
    'executive',
  ];

  ngOnInit() {
  }

}
