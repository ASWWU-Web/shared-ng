import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Profile, ProfileFull, Names, ProfilePOST } from '../interfaces/interfaces';
import { filter } from 'rxjs/operators';

@Injectable()
export class MaskRequestService extends RequestService {
  baseURL = 'mask';  // currently unused

  constructor(http: HttpClient) {
    super(http);
  }

  ////////////////////
  // Mask
  ///////////////////
  /**
   * Lists profiles; either all profiles, or with filter params
   *
   * "/search/all"
   * "/search/(.*)/(.*)"
   *
   * https://petstore.swagger.io/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/mask.yml#/mask/get_search_all
   * https://petstore.swagger.io/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/mask.yml#/mask/get_search__year___search_query_
   * @param year
   * @param searchQuery username or full_name
   * @return array of user profiles
   */
  listProfile(filterParams?: any): Observable<Profile[]> {
    let profileObservable = null;
    if (filterParams && filterParams['year'] != null && filterParams['searchQuery'] != null) {
      profileObservable = super.get(`search/${filterParams['year']}/${filterParams['searchQuery']}`).pipe(
        map((results: {results: Profile[]}) => results.results)
      );
    } else {
      profileObservable = super.get(`search/all`).pipe(
        map((results: Profile[]) => results)
      );
    }

    return profileObservable;
  }

  /**
   * Lists names
   *
   * "/search/names"
   * https://petstore.swagger.io/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/mask.yml#/mask/get_search_names
   * @param filterParams limit = number of results to return, full_name is the search query
   * @return list of Names
   */
  listName(filterParams: any): Observable<Names[]> {
    const maskObservable = super.get(`search/names`, filterParams).pipe(
      map((results: {names: Names[]}) => results.names)
    );
    return maskObservable;
  }

  /**
   *  Read profile
   *
   * "/profile/(.*)/(.*)"
   * https://petstore.swagger.io/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/mask.yml#/profile/get_profile__year___username_
   * @param year
   * @param username
   * @return user's profile
   */
  readProfile(year: string, username: string): Observable<ProfileFull> {
    const profileObservable = super.get(`profile/${year}/${username}`);
    return profileObservable;
  }

  /**
   * "/update/(.*)"
   *
   * https://petstore.swagger.io/?url=https://raw.githubusercontent.com/ASWWU-Web/python_server/develop/docs/mask.yml#/profile/post_update__username_
   * @return user's updated full profile
   */
  updateProfile(username: string, data: any): Observable<ProfilePOST> {
    const profileObservable = super.post(`update/${username}`, data);
    return profileObservable;
  }

  /**
   * "/update/list_photos"
   *
   * @return array of photo urls
   */
  listPhotos(): Observable<string[]> {
    const photoObservable = super.get(`/update/list_photos`);
    return photoObservable;
  }
}
