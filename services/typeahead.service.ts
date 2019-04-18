import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/internal/operators';

@Injectable()
export class TypeAheadRequestService {

  constructor(private rs: RequestService) { }

  private getNames(query: string) {
    if (query === '') {
      return of({results: []});
    }
    return this.rs.get('search/names', {full_name: query});
  }

  public search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((data) => this.getNames(data)),
      map((data: {results: {username: string, full_name: string}[]}) => {
        return data.results.map((item) => item.username);
      })
    );
  }
}
