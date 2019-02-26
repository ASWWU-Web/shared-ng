// originally coppied from pages

//This is here just for testing. It should eventually be put in a separate git repo
//or be bundled with a base ASWWU project.
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

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

  /**
   * Lists elections
   * 
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_election
   * @param queryParams
   * @returns all elections or election specified by urlParams
   */
  listElection(queryParams?:any):Observable<Election[]>{
    let elections = super.get('elections/election', queryParams).pipe(
      map((data: {elections:Election[]}) => data.elections)
    );
    return elections
  }
}
