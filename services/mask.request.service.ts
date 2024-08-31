import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Profile, ProfileFull, Names, ProfilePOST } from '../interfaces/interfaces';
import { ProfileModel } from 'src/app/modules/mask/profile.model';

@Injectable({
  providedIn: 'root'
})
export class MaskRequestService extends RequestService {
  baseURL = 'mask';  // currently unused

  constructor(http: HttpClient) {
    super(http);
  }

  /// /////////////////
  // Mask
  /// ////////////////
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
  listProfile(year: string, searchQuery: string): Observable<Profile[]>;
  listProfile(): Observable<Profile[]>;
  listProfile(year?: string, searchQuery?: string): Observable<Profile[]> {
    let uri = `search/all`;
    if (year && searchQuery) {
      uri = `search/${year}/${searchQuery}`;
    }

    const profileObservable = super.get(uri).pipe(
      map((data: { results: Profile[] }) => data.results)
    );

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
  listName(filterParams: string): Observable<Names[]> {
    const maskObservable = super.get(`search/names`, filterParams).pipe(
      map((results: { names: Names[] }) => results.names)
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
  updateProfile(username: string, data: ProfileModel): Observable<ProfilePOST> {
    const profileObservable = super.post(`update/${username}`, data);
    return profileObservable;
  }

  /**
   * "/update/list_photos"
   *
   * @return array of photo urls
   */
  listPhotos(): Observable<{ photos: string[] }> {
    const photoObservable = super.get(`/update/list_photos`);
    return photoObservable;
  }

  /**
   * "/update/list_pending_photos"
   *
   * @return array of pending photo urls
   */
  listPendingPhotos(): Subject<{ photos: string[] }> {
    const $pendingPhotos = super.get(`/update/list_pending_photos`);
    const $sub: Subject<{ photos: string[] }> = new Subject<{ photos: string[] }>();
    $pendingPhotos.subscribe({
      complete: () => ({}),
      error: x => $sub.error(x),
      next: x => $sub.next(x)
    });
    return $sub;
  }

  /**
   * "/update/approve_photo/(.*)"
   *
   * @return array of remaining pending photo urls
   */
  approvePhoto(url: string): Observable<{ photos: string[] }> {
    return super.get(`/update/approve_photo/${url}`);
  }

  /**
   * "/update/dismay_photo/(.*)"
   *
   * @return array of remaining pending photo urls
   */
  dismayPhoto(url: string): Observable<{ photos: string[] }> {
    return super.get(`/update/dismay_photo/${url}`);
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      }
      reader.onerror = error => reject(error);
    });
  }

  /**
   * "/update/upload_photo"
   *
   * @return
   */
  async uploadPhoto(fileToUpload: File) {
    const imageBase64 = await this.fileToBase64(fileToUpload);
    return super.post(`/update/upload_photo`, { image: imageBase64 });
  }
}
