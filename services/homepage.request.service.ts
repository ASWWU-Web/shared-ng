import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Forum } from '../interfaces/interfaces';

@Injectable()
export class HomepageRequestService extends RequestService {

    constructor(http: HttpClient) {
        super(http);
    }

    /**
     * Create Forum
     * @param data
     * @returns JSON object containing open forum info
     */
    createForum(data: any): Observable<Forum> {
        const forumObservable = super.post('homepage/open_forum', data);
        return forumObservable;
    }

}
