import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RequestService } from "./request.service";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import {
  AnswerObject,
  ApplicationPOST,
  ApplicationView,
  JobView,
} from "../interfaces/interfaces";
import { catchError, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class JobsRequestService extends RequestService {
  baseURL = "forms";

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Returns an observable for all information about a specific job posting, including questions.
   */
  readJob(jobId: number): Observable<JobView> {
    const jobObservable = super
      .get(`${this.baseURL}/job/view/${jobId}`)
      .pipe(map((data: { form: JobView }) => data.form));
    return jobObservable;
  }

  /**
   * Returns an observable for all information about a specific application, including answers to questions.
   * If the application is missing or there is an error in fetching it, a new unpopulated application is provided.
   */
  readApplication(
    jobId: number,
    applicantUsername: string,
  ): Observable<ApplicationView> {
    const applicationObservable = super
      .get(`${this.baseURL}/application/view/${jobId}/${applicantUsername}`)
      .pipe(
        catchError((error) => {
          const newApplicationView: ApplicationView = {
            username: applicantUsername,
            status: "new",
            resume: "",
            answers: [],
            jobID: jobId,
          };
          const newObservable = of({ application: newApplicationView });
          return newObservable;
        }),
        map((data: { application: ApplicationView }) => data.application),
      );
    return applicationObservable;
  }

  /**
   * returns an observable for posting a new submission to the server. Based on legacy code, so there is currently no specific return type.
   */
  postSubmission(submissionData: ApplicationPOST): Observable<any> {
    const submissionObservable = super.post(
      `${this.baseURL}/application/submit`,
      submissionData,
      null,
      "urlencoded",
    );
    return submissionObservable;
  }
}
