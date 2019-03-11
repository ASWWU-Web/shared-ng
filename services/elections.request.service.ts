import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Election, Position } from 'src/shared-ng/interfaces/elections';

@Injectable()
export class ElectionsRequestService extends RequestService {
  baseURL = 'elections';

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
    const electionsObservable = super.get(`${this.baseURL}/election`, queryParams).pipe(
      map((data: {elections: Election[]}) => data.elections)
    );
    return electionsObservable;
  }

  /**
   * Read election
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_election__election_id_
   * @param queryParams
   * @return a single election JSON object
   */
  readElection(queryParams: any): Observable<Election[]> {
    const electionObservable = super.get(`${this.baseURL}/election/${queryParams}`);
    return electionObservable;
  }

  /**
   * Read current election
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_current
   * @returns a single election JSON object
   */
  readElectionCurrent(): Observable<Election> {
    const electionObservable = super.get(`${this.baseURL}/current`);
    return electionObservable;
  }

  /**
   * Create elections
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/post_election
   * @returns JSON object containing the election info created
   */
  createElection(data: any): Observable<Election[]> {
    const electionsObservable = super.post(`${this.baseURL}/election`, data);
    return electionsObservable;
  }

  /**
   * Update election
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/put_election__election_id_
   * @param queryParams
   * @returns JSON object containing the elction info that was updated
   */
  updateElection(data: any, queryParams: any): Observable<Election[]> {
    const electionObservable = super.put(`${this.baseURL}/election/` + queryParams, data);
    return electionObservable;
  }

  /**
   * Count election votes
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_election__election_id__count
   * @param queryParams
   * @return JSON object of votes for candidates
   */
  readElectionCount(queryParams: any) {
    const electionCount = super.get(`${this.baseURL}/election/${queryParams}/count`);
    return electionCount;
  }

  /**
   * Lists Positions
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/position/get_position
   * @param queryParams
   * @return an observable of all elections or elections specified by urlParams
   */
  listPosition(queryParams?: any): Observable<Position[]> {
    const positionsObservable = super.get(`${this.baseURL}/position`, queryParams).pipe(
      map((data: {positions: Position[]}) => data.positions)
    );
    return positionsObservable;
  }

  /**
   * Read position
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/position/get_position__position_id_
   * @param queryParams
   * @return a single election JSON object
   */
  readPosition(queryParams: any): Observable<Position[]> {
    const positionObservable = super.get(`${this.baseURL}/position`, queryParams).pipe(
      map((data: {positions: Position[]}) => data.positions)
    );
    return positionObservable;
  }
}
