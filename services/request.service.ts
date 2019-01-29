// originally coppied from pages

//This is here just for testing. It should eventually be put in a separate git repo
//or be bundled with a base ASWWU project.
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import { environment } from '../../shared-ng/environments/environment';
import { User } from './user.model';

//import { request } from 'https';

@Injectable()
export class RequestService {
  authUser: User;
  private isLoggedIn: boolean = false;
  private URLENCODED: string = "application/x-www-form-urlencoded; charset=UTF-8";


  constructor(private http: HttpClient) {}

  private setCurrentUser(user: any): void {
    if (user.hasOwnProperty('wwuid') && user.wwuid) {
      this.authUser = new User(user);
      this.isLoggedIn = true;
    } else {
      this.authUser = undefined;
      this.isLoggedIn = false;
    }
  }


  /*
  * Verifies the login status of the current user.
  * Gets current user and sets it to authUser
  * Also returns the user object to the callback function.
  */
  verify(cb?: any): void {
    //TODO: Determine if the token really should be updated. (ie. Only if the
    // token is older than 1 hour should a new one be generated.)
    if (document.cookie.search("token=") !== -1) {
      this.verifyGet("verify", data => {
        //Log in the user
        let user = data.user || null;
        this.setCurrentUser(user);
        if (typeof cb == "function") cb(user);
      }, () => {
        //user in not logged in remove authUser.
        this.setCurrentUser({});
        if (typeof cb == "function") cb(null);
      });
    } else {
      this.authUser = undefined;
      this.isLoggedIn = false;
    }
  }


  /**
   * Takes a uri suffix or a full url. If it is not a full url append aswwu.com and add forward slashes as needed.
   * @param uri The part of the url following aswwu.com, or a full url
   */
  private createUri(uri:string): string{
    let url = uri
    if (!url.startsWith("http")) {
      url = environment.SERVER_URL;
      if (url.split('').pop() != '/' && uri[0] != '/') url += '/';
      url += uri;
    }
    return url;
  }


  /**
   * Takes data in a javascript object and converts it into a json or url encoded string.
   * @param data a javascript object
   * @param encoding use `urlencoded` to set the encoding to x-www-form-urlencoded, optional
   */
  private createBody(data:any, encoding?:string):string {
    let body:string;
    if (encoding == 'urlencoded') {
      body = this.objToHttpParams(data).toString();
    } else {
      body = JSON.stringify(data);
    }
    return body;
  }


  /**
   * create the options part of an angular http request. sets header (content type) and url parameters.
   * @param urlParams optional, parameters to be added to the request url
   * @param encoding optional, request encoding, defaults to json
   */
  private createOptions(urlParams?:any, encoding?:string) {
    if(!urlParams){
      urlParams = {};
    }

    if(encoding == 'urlencoded') {
      encoding = this.URLENCODED;
    }
    else {
      encoding = "application/json";
    }

    let headers = new HttpHeaders().set('Content-Type', encoding);

    let options = {
      headers: headers,
      params: urlParams
    };

    return options;
  }


  /*
  * Seperate function to make get requests in the Verify function.
  * Use of the normal get function would cause an infinite loop.
  * */
  private verifyGet(uri: string, afterRequest, catchError): void {
    let req = this.createUri(uri);
    let options = this.createOptions();
    this.http.get(req, options)
      .subscribe(
        data => afterRequest(data),
        err => (catchError ? catchError(err) : console.error(err))
      );
  }


  /**
   * Converts a javascript object into an httpParam object for use in sending url encoded data in requests
   * @param obj javascript object to convert
   */
  private objToHttpParams(obj): HttpParams {
    let params: HttpParams = new HttpParams();
    for (var key of Object.keys(obj)) {
      if (typeof obj[key] == "string") {
        params = params.append(key, obj[key].replace(/\;/g, ","));
      } else {
        params = params.append(key, JSON.stringify(obj[key]));
      }
    }
    return params;
  }


  /**
   * generates an http request
   * @param requestType string, request type, options: "GET", "DELETE", "POST", "PUT"
   * @param uri string, the part of the URL following aswwu.com and before parameters, or a full URL
   * @param urlParams javascript object, containing parameters to be placed in the request URL
   * @param data javascript object, data to be used in POST and PUT requests
   * @param encoding string, use "urlencoded" if the server needs that format, defaults to json
   */
  private request(requestType:string, uriSuffix:string, urlParams?:any, data?:any, encoding?:string): Observable<any>{
    this.verify;

    let url = this.createUri(uriSuffix);
    let body = this.createBody(data, encoding);
    let options = this.createOptions(urlParams, encoding);

    let observable:Observable<any>;

    if      (requestType == "GET") { observable = this.http.get(url, options); }
    else if (requestType == "DELETE") { observable = this.http.delete(url, options); }
    else if (requestType == "POST") { observable = this.http.post(url, body, options); }
    else if (requestType == "PUT") { observable = this.http.put(url, body, options); }
    // patch not tested
    else if (requestType == "PATCH") { observable = this.http.patch(url, body, options); }

    return observable;
  }


  get(uri:string, urlParams?:any):Observable<any> {
    return this.request("GET", uri, urlParams, null, null);
  }

  delete(uri:string, urlParams?:any):Observable<any> {
    return this.request("DELETE", uri, urlParams, null, null);
  }

  post(uri:string, data:any, urlParams?:any, encoding?:any):Observable<any> {
    return this.request("POST", uri, urlParams, data, encoding);
  }

  put(uri:string, data:any, urlParams?:any, encoding?:any):Observable<any> {
    return this.request("PUT", uri, urlParams, data, encoding);
  }

  // patch not tested
  patch(uri:string, data:any, urlParams?:any, encoding?:any):Observable<any> {
    return this.request("PATCH", uri, urlParams, data, encoding);
  }


  uploadImage(file:File, callback:Function, catchError:Function) {
    let data = new FormData;
    data.append('file', file, file.name);
    let request = this.createUri("/pages/media/upload_image");
    this.http.post(request, data).subscribe(
      data => callback(data),
      err => (catchError ? catchError(err) : console.log(err))
    );
  }


  isLoggedOn(): boolean {
    //Returns true if authUser is defined, false otherwise.
    return this.isLoggedIn;
  }

}
