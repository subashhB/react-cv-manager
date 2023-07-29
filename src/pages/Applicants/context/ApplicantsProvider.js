import { createContext, useReducer } from "react";
import * as ActionTypes from "./ActionTypes";

export const ApplicantsContext = createContext();

export const applicantsReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_APPLICANTS:
            return {
                applicants: action.payload,
            };
        default:
            return state;
    }
};

export const ApplicantsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(applicantsReducer, {
        applicants: [],
    });
    return (
        <ApplicantsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ApplicantsContext.Provider>
    );
};
