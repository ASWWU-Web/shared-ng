/*
 * Created by: Stephen Ermshar and Sheldon Woodward
 * Date: 2018-2019
 *
 * Note: Originally copied from the pages project and
 * reworked from Ryan Rabello's implementation.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../shared-ng/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8';

  constructor(private http: HttpClient) {
  }

  /**
   * Takes a uri suffix or a full url. If it is not a full url append aswwumask.com and add forward slashes as needed.
   * @param uri The part of the url following aswwumask.com, or a full url
   */
  protected createUri(uri: string): string {
    let url = uri;
    if (!url.startsWith('http')) {
      url = environment.SERVER_URL;
      if (url.split('').pop() !== '/' && uri[0] !== '/') {
        url += '/';
      }
      url += uri;
    }
    return url;
  }

  /**
   * Takes data in a javascript object and converts it into a json or url encoded string.
   * @param data a javascript object
   * @param encoding use `urlencoded` to set the encoding to x-www-form-urlencoded, optional
   */
  private createBody(data: any, encoding?: string): string {
    let body: string;
    if (encoding === 'urlencoded') {
      body = this.objToHttpParams(data);
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
  private createOptions(urlParams?: any, encoding?: string) {
    if (!urlParams) {
      urlParams = {};
    }

    if (encoding === 'urlencoded') {
      encoding = this.URLENCODED;
    } else {
      encoding = 'application/json';
    }

    const headers = new HttpHeaders().set('Content-Type', encoding);

    const options = {
      headers, // shorthand for `headers: headers`, see tslint rules
      params: urlParams
    };

    return options;
  }

  /**
   * Converts a javascript object into an httpParam object for use in sending url encoded data in requests
   * @param obj javascript object to convert
   */
  private objToHttpParams(obj: any): string {
    let params: HttpParams = new HttpParams();
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        params = params.append(key, obj[key]);
      } else {
        params = params.append(key, JSON.stringify(obj[key]));
      }
    }
    // toString does not appear to encode semicolons correctly, so we manually do it with `replace`
    return params.toString().replace(/\;/g, '%3B');
  }

  /**
   * generates an http request
   * @param requestType string, request type, options: "GET", "DELETE", "POST", "PUT", "PATCH"
   * @param uri string, the part of the URL following aswwumask.com and before parameters, or a full URL
   * @param urlParams javascript object, containing parameters to be placed in the request URL
   * @param data javascript object, data to be used in POST and PUT requests
   * @param encoding string, use "urlencoded" if the server needs that format, defaults to json
   */
  private request(requestType: string, uriSuffix: string, urlParams?: any, data?: any, encoding?: string): Observable<any> {
    const url = this.createUri(uriSuffix);
    const body = this.createBody(data, encoding);
    const options = this.createOptions(urlParams, encoding);

    let observable: Observable<any>;

    if (requestType === 'GET') {
      observable = this.http.get(url, options);
    } else if (requestType === 'DELETE') {
      observable = this.http.delete(url, options);
    } else if (requestType === 'POST') {
      observable = this.http.post(url, body, options);
    } else if (requestType === 'PUT') {
      observable = this.http.put(url, body, options);
    } else if (requestType === 'PATCH') {
      observable = this.http.patch(url, body, options);
    }

    return observable;
  }

  get(uri: string, urlParams?: any): Observable<any> {
    return this.request('GET', uri, urlParams, null, null);
  }

  delete(uri: string, urlParams?: any): Observable<any> {
    return this.request('DELETE', uri, urlParams, null, null);
  }

  post(uri: string, data: any, urlParams?: any, encoding?: any): Observable<any> {
    return this.request('POST', uri, urlParams, data, encoding);
  }

  put(uri: string, data: any, urlParams?: any, encoding?: any): Observable<any> {
    return this.request('PUT', uri, urlParams, data, encoding);
  }

  // patch not tested
  patch(uri: string, data: any, urlParams?: any, encoding?: any): Observable<any> {
    return this.request('PATCH', uri, urlParams, data, encoding);
  }

}
