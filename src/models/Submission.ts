export class Submission {
  id: string;
  journal: string;
  submissionDate: Date;
  pieces: string[];
  responseDate?: Date;
  responseDecision?: string;

  constructor(
    id: string,
    journal: string,
    submissionDate: Date,
    pieces: string[],
    responseDate?: Date,
    responseDecision?: string
  ) {
    this.id = id;
    this.journal = journal;
    this.submissionDate = submissionDate;
    this.pieces = pieces;
    this.responseDate = responseDate;
    this.responseDecision = responseDecision;
  }
}


