import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/shared-ng/services/url.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  base_url: string;
  constructor(urlService: UrlService) {
    this.base_url = urlService.getBaseUrl();
  }

  departments = [
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
