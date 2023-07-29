import { useContext } from "react";
import { ApplicantsContext } from "../context/ApplicantsProvider";

export const useApplicantsContext = () => {
    const context = useContext(ApplicantsContext);
    if (!context) {
        throw new Error(
            "useApplicantsContext must be inside ApplicantsContextProvider"
        );
    }
    return context;
};
