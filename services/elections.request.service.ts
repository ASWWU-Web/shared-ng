// originally coppied from pages

//This is here just for testing. It should eventually be put in a separate git repo
//or be bundled with a base ASWWU project.
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import { environment } from '../../shared-ng/environments/environment';
import { User } from './user.model';
import { RequestService } from './request.service';

//import { request } from 'https';

@Injectable()
export class ElectionsRequestService extends RequestService{

  constructor(http: HttpClient) {
    super(http);
  }

}
