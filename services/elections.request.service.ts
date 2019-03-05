import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

interface Election {
  id: string;
  election_type: string;
  name: string;
  max_votes: number;
  start: string;
  end: string;
  show_results: string;
}
@Injectable()
export class ElectionsRequestService extends RequestService {

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Lists elections
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_election
   * @param queryParams
   * @returns an observable of all elections or elections specified by urlParams
   */
  listElection(queryParams?: any): Observable<Election[]> {
    const electionsObservable = super.get('elections/election', queryParams).pipe(
      map((data: {elections: Election[]}) => data.elections)
    );
    return electionsObservable;
  }

  /**
   * Read current election
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_current
   * @returns a single election JSON object
   */
  readElectionCurrent(): Observable<Election> {
    const electionObservable = super.get('elections/current');
    return electionObservable;
  }

  /**
   * Create elections
   *
   *https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/post_election
  *@param queryParams
  *@returns JSON object containing the election info created
  */
  createElections(data: any): Observable<Election[]> {
    const electionsObservable = super.post('elections/election', data);
    return electionsObservable;
  }
}
