import axios from "axios";
import React, { useEffect, useState } from "react";

const ApplicantsDetails = ({ id }) => {
    const [applicantDetails, setApplicantsDetails] = useState(null);
    useEffect(() => {
        console.log("Id", id);
        if (id) {
            axios
                .get(`http://localhost:3001/Applicants/${id}`)
                .then((response) => {
                    setApplicantsDetails(response.data);
                    console.log("Response", response.data);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);
    return (
        <div className="ms-10">
            {applicantDetails ? (
                <>
                    <div className="flex flex-col">
                        <div className="flex-row w-full justify-between items-center mb-4">
                            <div className="flex gap-5">
                                <div className="flex flex-col">
                                    <div className="flex flex-row">
                                        <b>First Name:</b>{" "}
                                        {applicantDetails.FirstName}{" "}
                                    </div>
                                    <div>
                                        {applicantDetails.MiddleName ? (
                                            <>
                                                <b>MiddleName:</b>{" "}
                                                {applicantDetails.MiddleName}{" "}
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div>
                                        <b>Last Name:</b>{" "}
                                        {applicantDetails.LastName}
                                    </div>
                                </div>
                                <div className="flex-row">
                                    <b>Date of Birth: </b>
                                    {applicantDetails.DOB}
                                </div>
                                <div className="flex-row">
                                    <b>Date of Birth: </b>
                                    {applicantDetails.DOB}
                                </div>
                            </div>

                            <div>
                                <img
                                    src={applicantDetails.ProfilePictureUrl}
                                    alt="ProfilePicture"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-7 w-full">
                            <div>
                                <b>Primary Email: </b>
                                {applicantDetails.PrimaryEmail}
                            </div>
                            <div>
                                <b>Contact Number: </b>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
};

export default ApplicantsDetails;
