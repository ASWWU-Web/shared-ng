import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Profile, ProfileFull, Names, ProfilePOST } from 'src/shared-ng/interfaces/mask';

@Injectable()
export class MaskRequestService extends RequestService {
  baseURL = 'mask';

  constructor(http: HttpClient) {
    super(http);
  }

  ////////////////////
  // Mask
  ///////////////////
  /**
   * Lists profiles
   * "/search/all"
   *
   * @returns an observable of all profiles
   */
  listProfile(): Observable<Profile[]> {
    const profileObservable = super.get(`${this.baseURL}/search/all`).pipe(
      map((results: {profiles: Profile[]}) => results.profiles)
    );
    return profileObservable;
  }

  /**
   * Lists names
   *
   * "/search/names"
   *
   * @param filterParams limit = number of results to return, full_name is the search query
   * @return an observable of names
   */
  // listName(limit: number, full_name: string): Observable<Names> {
  listName(filterParams: any): Observable<Names[]> {
    const maskObservable = super.get(`${this.baseURL}/search/names`, filterParams).pipe(
      map((results: {names: Names[]}) => results.names)
    );
    return maskObservable;
  }

  /**
   *  Read profile
   *
   * "/profile/(.*)/(.*)"
   *
   * @param year
   * @param username
   * @return a user's profile
   */
  readProfile(year: string, username: string): Observable<ProfileFull> {
    const profileObservable = super.get(`${this.baseURL}/profile/${year}/${username}`);
    return profileObservable;
  }

  /**
   * "/search/(.*)/(.*)"
   * @param year
   * @param searchQuery username or full_name
   * @return array of user profiles
   */
  listProfileFilter(year: string, searchQuery: string): Observable<Profile[]> {
    const profileObservable = super.get(`${this.baseURL}/search/${year}/${searchQuery}`).pipe(
      map((results: {profiles: Profile[]}) => results.profiles)
    )
    return profileObservable;
  }

  /**
   * "/update/(.*)"
   */
  updateProfile(username: string, data: any):Observable<ProfilePOST> {
    const profileObservable = super.post(`${this.baseURL}/update/${username}`, data);
    return profileObservable;
  }
}
