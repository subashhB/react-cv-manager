import React, { useEffect } from "react";
import { useApplicantsContext } from "../hook/useApplicantsContext";
import axios from "axios";
import * as ActionTypes from "../context/ActionTypes";

const ApplicantsListPage = () => {
    const { applicants, dispatch } = useApplicantsContext();
    useEffect(() => {
        axios.get("http://localhost:3001/Applicants").then((response) => {
            dispatch({
                type: ActionTypes.SET_APPLICATNS,
                payload: response.data,
            });
        });
    }, [dispatch]);
    console.log(applicants);
    return <div>ApplicantsListPage</div>;
};

export default ApplicantsListPage;
