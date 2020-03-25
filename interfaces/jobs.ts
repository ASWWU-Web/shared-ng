export interface AnswerObject {
  questionID: number;
  answer: string;
}

export interface QuestionObject {
  question: string;
  id: number;
}

export interface ApplicationPOST {
  jobID: number;
  username: string;
  answers: AnswerObject[];
}

// /forms/job/view/{{JobID}}
// sends {form: JobView}
export interface JobView {
  department: string;
  featured: boolean;
  job_description: string;
  questions: QuestionObject[];
  owner: string;
  image: string;
  job_name: string;
  visibility: boolean;
  jobID: number;
}

// /froms/application/view/{{jobID}}
// sends {application: ApplicationView}
export interface ApplicationView {
  username: string;
  status: string;
  resume: string;
  answers: AnswerObject[];
  jobID: number;
}

export interface FormPairView {
  job: JobView;
  application: ApplicationView;
}
