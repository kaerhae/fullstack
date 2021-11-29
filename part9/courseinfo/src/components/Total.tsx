import React from "react";
import { ITotal } from "../types";

const Total = ({courseParts}: ITotal) : JSX.Element => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

export default Total