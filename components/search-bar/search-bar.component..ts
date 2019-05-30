import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { of, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, catchError, switchMap, map } from 'rxjs/operators';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { HomepageRequestService, HermesService } from '../../services/services';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input() model: string = null;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  showSearchBar: boolean = true;

  // placeholder options
  placeholders: string[] = ['search the mask...', /*'search pages...', 'search jobs...'*/];
  // default placeholder
  placeHolder: string = 'search the mask...';

  searchPageroute = 'search';

  // new page routes
  formGroup: FormGroup;

  constructor(private hprs: HomepageRequestService, private hs: HermesService, private router: Router) {
    this.formGroup = new FormGroup({name: new FormControl('')});

  }

  ngOnInit() {
    this.hs.getSearchBar().subscribe((data) => {
      this.showSearchBar = data;
    });
  }

  getNames(query: string) {
    if (query === '') {
      return of({results: []});
    }
    return this.hprs.get('search/names', {full_name: query});
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((data) => this.getNames(data)),
      map((data: {results: {username: string, full_name: string}[]}) => {
        return data.results;
      })
    );
  }

  formatter = (x: {username: string, full_name: string}) => x.full_name;

  // new search function
  superSearch(userinput?: any) {
    /**
     * If user chooses name from dropdown menu
     * then no arguments are passed in.
     * If user chooses to search whatever they
     * typed in then 1 is passed in distiguishing
     * which value to search.
     */
    if (!userinput) {
      // parses array of dropdown menu and searches username
      userinput = this.formGroup.value.name.username;
    } else if (userinput === 1) {
      // keeps generic name user typed
      userinput = this.formGroup.value.name;
    }
  }
}

