import React from "react";
import { IContent } from "../types";
import Part from "./Part";

const Content = ({courseParts}: IContent) :JSX.Element => (
  <div>
    {
      courseParts.map((part) => 
        <Part key={part.name} part={part}/>
      )
    }
  </div>
)




export default Content