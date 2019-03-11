export interface Election {
    id: string;
    election_type: string;
    name: string;
    max_votes: number;
    start: string;
    end: string;
    show_results: string;
  }
  export interface Position {
    id: string;
    position: string;
    election_type: string;
    active: boolean; // this may need to be a string
    order: number; // this may need to be a string
  }
  export interface Candidate {
    id: string;
    election: string;
    position: string;
    username: string;
    display_name: string;
  }
  // Currently unused
  export interface CandidatePOST {
    position: string;
    username: string;
    display_name: string;
  }
  export interface Vote {
    id: string;
    election: string;
    position: string;
    vote: string;
    username: string;
  }
  export interface VotePOST {
    election: string;
    position: string;
    vote: string;
  }
  export interface Ballot {
    id: string;
    election: string;
    position: string;
    vote: string;
    student_id: string;
    manual_entry: string;
  }
  export interface BallotPOST {
    election: string;
    position: string;
    student_id: string;
    vote: string;
  }
