import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';

@Injectable()
export class PagesRequestService extends RequestService {

  constructor(http: HttpClient, private rs: RequestService) {
      super(http);
  }

  /**
   * upload an image for the pages site.
   */
  uploadImage(file: File, callback: (data) => void, catchError: (err) => void) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const request = this.createUri('/pages/media/upload_image');
    this.rs.post(request, formData).subscribe(
      data => callback(data),
      err => (catchError ? catchError(err) : console.log(err))
    );
  }

}
