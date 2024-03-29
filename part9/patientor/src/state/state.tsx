import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Entry, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient },
  patient: Patient | null;
  diagnoses: Diagnosis[];
  entry: Entry | null;
};

const initialState: State = {
  patients: {},
  patient: null as (null | Patient),
  diagnoses: [],
  entry: null as (null | Entry)
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
