// originally coppied from pages

//This is here just for testing. It should eventually be put in a separate git repo
//or be bundled with a base ASWWU project.
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

//import { request } from 'https';

interface Election {
  id: string;
  election_type: string;
  start: string;
  end: string;
  show_results: string;
}
@Injectable()
export class ElectionsRequestService extends RequestService{

  constructor(http: HttpClient) {
    super(http);
  }

  // returns all elections or election specified by urlParams
  getElections(urlParams?:any):Observable<Election[]>{
    let elections = super.get('elections/election', urlParams).pipe(
      map((data: {elections:Election[]}) => data.elections)
    );
    return elections
  }
}
