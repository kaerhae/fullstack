export interface IHeader {
  name: string;
}


export interface IContent {
  courseParts: CoursePart[];
}

export interface ITotal {
  courseParts: CoursePart[];
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseNormalDescription extends CoursePartBase {
  description?: string;
}

export interface CourseNormalPart extends CourseNormalDescription {
  type: "normal";
}
export interface CourseProjectPart extends CourseNormalDescription {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseNormalDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseNormalDescription {
  type: "special";
  requirements: string[];
}






export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;