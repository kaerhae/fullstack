import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../helpers";

const Part = ({ part }: {part: CoursePart}): JSX.Element =>  {
    switch (part.type) {
      case "normal":
        return (
          <div>
            <p><b>Name and Number of Exercises: </b>{part.name} {part.exerciseCount}</p>
            <p><b>Description: </b>{part.description}</p>
          </div>
        )
      case "groupProject":
        return (
          <div>
            <p><b>Name and Number of Exercises: </b>{part.name} {part.exerciseCount}</p>
            <p><b>Number of Group Projects: </b>{part.groupProjectCount}</p>
          </div>
        )
      case "submission":
        return (
          <div>
            <p><b>Name and Number of Exercises: </b>{part.name} {part.exerciseCount}</p>
            <p><b>Exercise Submission Link: </b>{part.exerciseSubmissionLink}</p>
            <p><b>Description: </b>{part.description}</p>
          </div>
        )
      case "special":
        return (
          <div>
            <p><b>Name and Number of Exercises: </b>{part.name} {part.exerciseCount}</p>
            <p><b>Description: </b>{part.description}</p>
            <p>
              <b>Requirements: </b>
              {part.requirements.map(r =>
                <li
                  key={r}
                >{r}
              </li>
              )}</p>
          </div>
        )
      default:
        return assertNever(part);
    }
  }

export default Part