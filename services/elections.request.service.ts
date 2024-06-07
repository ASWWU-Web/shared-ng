import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Election, Position, Candidate, Vote, Ballot, BallotPOST } from '../interfaces/interfaces';

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
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_election
   * @param filterParams an object with properties used to filter results
   * @returns an observable of all elections or elections specified by urlParams
   */
  listElection(filterParams?: any): Observable<Election[]> {
    const electionsObservable = super.get(`${this.baseURL}/election`, filterParams).pipe(
      map((data: { elections: Election[] }) => data.elections)
    );
    return electionsObservable;
  }

  /**
   * Read election
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_election__election_id_
   * @param electionID
   * @return a single election JSON object
   */
  readElection(electionID: string): Observable<Election> {
    const electionObservable = super.get(`${this.baseURL}/election/${electionID}`);
    return electionObservable;
  }

  /**
   * Read current election
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_current
   * @returns a single election JSON object
   */
  readElectionCurrent(): Observable<Election> {
    const electionObservable = super.get(`${this.baseURL}/current`);
    return electionObservable;
  }

  /**
   * Create elections
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/post_election
   * @param data
   * @returns JSON object containing the election info created
   */
  createElection(data: any): Observable<Election> {
    const electionsObservable = super.post(`${this.baseURL}/election`, data);
    return electionsObservable;
  }

  /**
   * Update election
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/put_election__election_id_
   * @param data
   * @param electionID
   * @returns JSON object containing the elction info that was updated
   */
  updateElection(data: any, electionID: string): Observable<Election> {
    const electionObservable = super.put(`${this.baseURL}/election/${electionID}`, data);
    return electionObservable;
  }

  /**
   * Count election votes
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/election/get_election__election_id__count
   * @param electionID
   * @return JSON object of votes for candidates
   */
  readElectionCount(electionID: string) {
    const electionCount = super.get(`${this.baseURL}/election/${electionID}/count`);
    return electionCount;
  }

  ///////////////////
  // Positions
  //////////////////
  /**
   * Lists Positions
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/position/get_position
   * @param filterParams an object with properties used to filter results
   * @return an observable of all elections or elections specified by urlParams
   */
  listPosition(filterParams?: any): Observable<Position[]> {
    const positionsObservable = super.get(`${this.baseURL}/position`, filterParams).pipe(
      map((data: { positions: Position[] }) => data.positions)
    );
    return positionsObservable;
  }

  /**
   * Read position
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/position/get_position__position_id_
   * @param positionID
   * @return a single election JSON object
   */
  readPosition(positionID: string): Observable<Position[]> {
    const positionObservable = super.get(`${this.baseURL}/position`, positionID).pipe(
      map((data: { positions: Position[] }) => data.positions)
    );
    return positionObservable;
  }

  /**
   * Create position
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/position/post_position
   * @param data
   * @return JSON object containing the position info created
   */
  createPosition(data: any): Observable<Position> {
    const positionsObservable = super.post(`${this.baseURL}/position`, data);
    return positionsObservable;
  }

  /**
   * Update positions
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/position/put_position__position_id_
   * @param data
   * @param positionID
   * @return JSON object containing the position info that was updated
   */
  updatePosition(data: any, positionID: string): Observable<Position> {
    const positionObservable = super.put(`${this.baseURL}/position/${positionID}`, data);
    return positionObservable;
  }

  ///////////////////
  // Candidates
  //////////////////
  /**
   * List candidates
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/candidate/get_election__election_id__candidate
   * @param filterParams an object with properties used to filter results
   * @return an observable of all elections or elections specified by urlParams
   */
  listCandidates(filterParams: any, jsonData?: any): Observable<Candidate[]> {
    const candidateObservable = super.get(`${this.baseURL}/election/${filterParams}/candidate`, jsonData).pipe(
      map((data: { candidates: Candidate[] }) => data.candidates)
    );
    return candidateObservable;
  }

  /**
   * Read candidates
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/candidate/get_election__election_id__candidate__candidate_id_
   * @param electionID
   * @param candidateId
   * @return a single candidate JSON object
   */
  readCandidate(electionID: string, candidateId: string): Observable<Candidate> {
    const candidateObservable = super.get(`${this.baseURL}/election/${electionID}/candidate/${candidateId}`).pipe(
      map((data: { candidates: Candidate }) => data.candidates)
    );
    return candidateObservable;
  }

  /**
   * Create candidate
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/candidate/post_election__election_id__candidate
   * @param electionID
   * @return JSON object containing the candidate info created
   */
  createCandidate(electionID: string, data: any): Observable<Candidate> {
    const candidatesObservable = super.post(`${this.baseURL}/election/${electionID}/candidate`, data);
    return candidatesObservable;
  }

  /**
   * Update Candidate
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/candidate/put_election__election_id__candidate__candidate_id_
   * @param data
   * @param electionID
   * @param candidateID
   * @return JSON object containing the candidate info that was updated
   */
  updateCandidate(data: Candidate, electionID: string, candidateID: string): Observable<Candidate> {
    const candidateObservable = super.put(`${this.baseURL}/election/${electionID}/candidate/${candidateID}`, data);
    return candidateObservable;
  }

  /**
   * Remove candidate
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/candidate/delete_election__election_id__candidate__candidate_id_
   * @param electionID
   * @param candidateID
   */
  removeCandidate(electionID: string, candidateID: string): Observable<[]> {
    const candidateObservable = super.delete(`${this.baseURL}/election/${electionID}/candidate/${candidateID}`);
    return candidateObservable;
  }

  /////////////////
  // Vote
  ////////////////
  /**
   * List Votes
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/vote/get_vote
   * @param filterParams an object with properties used to filter results
   * @return  an observable of all votes or specified votes by parameters
   */
  listVote(filterParams?: any): Observable<Vote[]> {
    const votesObservable = super.get(`${this.baseURL}/vote`, filterParams).pipe(
      map((data: { votes: Vote[] }) => data.votes)
    );
    return votesObservable;
  }

  /**
   * Read vote
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/vote/get_vote__vote_id_   * @param queryParams
   * @param voteID
   * @return a single vote JSON object
   */
  readVote(voteID: string): Observable<Vote> {
    const voteObservable = super.get(`${this.baseURL}/vote/${voteID}`);
    return voteObservable;
  }

  /**
   * Create Vote
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/vote/post_vote
   * @param data
   * @return JSON object containing info of vote created
   */
  createVote(data: any): Observable<Vote> {
    const voteObservable = super.post(`${this.baseURL}/vote`, data);
    return voteObservable;
  }

  /**
   * Update vote
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/vote/put_vote__vote_id_
   * @param data
   * @param voteID
   * @return JSON object containing the vote info that was changed
   */
  updateVote(data: any, voteID: string): Observable<Vote> {
    const voteObservable = super.put(`${this.baseURL}/vote/${voteID}`, data);
    return voteObservable;
  }

  /**
   * Remove Vote
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/vote/delete_vote__vote_id_
   * @param voteID
   */
  removeVote(voteID: string): Observable<[]> {
    const voteObservable = super.delete(`${this.baseURL}/vote/${voteID}`);
    return voteObservable;
  }

  ////////////////
  // Ballot
  ///////////////
  /**
   * List ballot
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/ballot/get_election__election_id__ballot
   * @param electionID
   * @param filterParams an object with properties used to filter results
   * @return a lit of all votes in a ballot
   */
  listBallot(electionID: string, filterParams?: any): Observable<Ballot[]> {
    const ballotsObservable = super.get(`${this.baseURL}/election/${electionID}/ballot`, filterParams).pipe(
      map((data: { ballots: Ballot[] }) => data.ballots)
    );
    return ballotsObservable;
  }

  /**
   * Read ballot
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/ballot/get_election__election_id__ballot__vote_id_
   * @param ballotID
   * @param electionID
   * @return a single JSON object that conatins a vote
   */
  readBallot(electionID: string, ballotID: string): Observable<Ballot> {
    const ballotObservable = super.get(`${this.baseURL}/election/${electionID}/ballot/${ballotID}`).pipe(
      map((data: { ballots: Ballot }) => data.ballots)
    );
    return ballotObservable;
  }

  /**
   * Create Ballot
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/ballot/post_election__election_id__ballot
   * @param electionID
   * @param data
   * @return JSON object containing info of ballot created
   */
  createBallot(data: any, electionID: string): Observable<Ballot> {
    const ballotObservable = super.post(`${this.baseURL}/election/${electionID}/ballot`, data);
    return ballotObservable;
  }

  /**
   * Remove ballot
   *
   * https://docs.aswwumask.com/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/elections.yml#/ballot/delete_election__election_id__ballot__vote_id_
   * @param ballotID
   * @param electionID
   */
  removeBallot(electionID: string, ballotID: string): Observable<[]> {
    const ballotObservable = super.delete(`${this.baseURL}/election/${electionID}/ballot/${ballotID}`);
    return ballotObservable;
  }
}
