import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Notification} from "../interfaces/homepage";
import {RequestService} from "./request.service";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class NotificationRequestService extends RequestService {
  baseURL = 'homepage';

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Create Forum
   * @param data
   * @returns JSON object containing notification info
   */
  listNotifications(filterParams?: any): Observable<Notification[]> {
    const notificationsObservable = super.get(`${this.baseURL}/notifications`, filterParams).pipe(
      map((data: {notifications: Notification[]}) => data.notifications)
    );
    return notificationsObservable;
  }


}
