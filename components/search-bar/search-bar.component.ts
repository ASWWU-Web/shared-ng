import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HermesService } from '../../services/services';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  showSearchBar: boolean = true;
  placeholder: string;
  textInput: string;

  constructor(private hs: HermesService, private router: Router) {}

  ngOnInit() {
    this.hs.getSearchBar().subscribe((data) => {
      this.showSearchBar = data;
    });
    this.hs.getPlaceholder().subscribe((data) => {
      this.placeholder = data;
    });
  }

  sendText() {
    this.hs.sendSearchText(this.textInput);
  }
}

