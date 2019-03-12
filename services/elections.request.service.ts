import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Election, Position, Candidate, Vote } from 'src/shared-ng/interfaces/elections';

@Injectable()
export class ElectionsRequestService extends RequestService {
  baseURL = 'elections';

  constructor(http: HttpClient) {
    super(http);
  }
  ////////////////////
  // Elections
  ///////////////////
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
   * @param data
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
   * @param data
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

  ///////////////////
  // Positions
  //////////////////
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

  /**
   * Create position
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/position/post_position
   * @param data
   * @return JSON object containing the position info created
   */
  createPosition(data: any): Observable<Position[]> {
    const positionsObservable = super.post(`${this.baseURL}/position`, data);
    return positionsObservable;
  }

  /**
   * Update positions
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/position/put_position__position_id_
   * @param data
   * @param queryParams
   * @return JSON object containing the position info that was updated
   */
  updatePosition(data: any, queryParams: any): Observable<Position[]> {
    const positionObservable = super.put(`${this.baseURL}/position/` + queryParams, data);
    return positionObservable;
  }

  ///////////////////
  // Candidates
  //////////////////
  /**
   * List candidates
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/candidate/get_election__election_id__candidate
   * @param queryParams
   * @return an observable of all elections or elections specified by urlParams
   */
  listCandidates( queryParams: any, jsonData?: any): Observable<Candidate[]> {
    const candidateObservable = super.get(`${this.baseURL}/election/${queryParams}/candidate`, jsonData).pipe(
      map((data: {candidates: Candidate[]}) => data.candidates)
    );
    return candidateObservable;
  }

  /**
   * Read candidates
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/candidate/get_election__election_id__candidate__candidate_id_
   * @param queryParams
   * @param candidateId
   * @return a single candidate JSON object
   */
  readCandidate(queryParams: any, candidateId: any): Observable<Candidate[]> {
    const candidateObservable = super.get(`${this.baseURL}/election/${queryParams}/candidate/${candidateId}`).pipe(
      map((data: {candidates: Candidate[]}) => data.candidates)
    );
    return candidateObservable;
  }

  /**
   * Create candidate
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/candidate/post_election__election_id__candidate
   * @param queryParams
   * @return JSON object containing the candidate info created
   */
  createCandidate( queryParams: any, data: any): Observable<Candidate[]> {
    const candidatesObservable = super.post(`${this.baseURL}/election/${queryParams}/candidate`, data);
    return candidatesObservable;
  }

  /**
   * Update Candidate
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/candidate/put_election__election_id__candidate__candidate_id_
   * @param data
   * @param queryParams
   * @param candidateID
   * @return JSON object containing the candidate info that was updated
   */
  updateCandidate(data: any, queryParams: any, candidateID: any): Observable<Candidate[]> {
    const candidateObservable = super.put(`${this.baseURL}/election/${queryParams}/candidate/${candidateID}`, data);
    return candidateObservable;
  }

  /**
   * Remove candidate
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/candidate/delete_election__election_id__candidate__candidate_id_
   * @param queryParams
   * @param candidateID
   */
  removeCandidate(queryParams: any, candidateID: any): Observable<Candidate[]> {
    const candidateObservable = super.delete(`${this.baseURL}/election/${queryParams}/candidate/${candidateID}`);
    return candidateObservable;
  }

  /////////////////
  // Vote
  ////////////////
  /**
   * List Votes
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/vote/get_vote
   * @param queryParams
   * @return  an observable of all votes or specified votes by parameters
   */
  listVote(queryParams?: any): Observable<Vote[]> {
    const votesObservable = super.get(`${this.baseURL}/vote`, queryParams).pipe(
      map((data: {votes: Vote[]}) => data.votes)
    );
    return votesObservable;
  }

  /**
   * Read vote
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/vote/get_vote__vote_id_   * @param queryParams
   * @param queryParams
   * @return a single vote JSON object
   */
  readVote(queryParams: any): Observable<Vote[]> {
    const voteObservable = super.get(`${this.baseURL}/vote/${queryParams}`);
    return voteObservable;
  }

  /**
   * Create Vote
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/vote/post_vote
   * @param data
   * @return JSON object containing info of vote created
   */
  createVote(data: any): Observable<Vote[]> {
    const voteObservable = super.post(`${this.baseURL}/vote`, data);
    return voteObservable;
  }

  /**
   * Update vote
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/vote/put_vote__vote_id_
   * @param data
   * @param queryParams
   * @return JSON object containing the vote info that was changed
   */
  updateVote(data: any, queryParams: any): Observable<Vote[]> {
    const voteObservable = super.put(`${this.baseURL}/vote/${queryParams}`, data);
    return voteObservable;
  }

  /**
   * Remove Vote
   *
   * https://docs.aswwu.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/vote/delete_vote__vote_id_
   * @param queryParams
   */
  removeVote(queryParams: any): Observable<Vote[]> {
    const voteObservable = super.delete(`${this.baseURL}/vote/${queryParams}`);
    return voteObservable;
  }
}
