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
                    <div className="flex justify-between item-center mb-8 mt-5">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">
                                {applicantDetails.FirstName}{" "}
                                {applicantDetails.MiddleName && (
                                    <span>{applicantDetails.MiddleName} </span>
                                )}
                                {applicantDetails.LastName}
                            </h2>
                            <p className="text-gray-600">
                                Date of Birth: {applicantDetails.DOB}
                            </p>
                            <p className="text-gray-600">
                                Primary Email: {applicantDetails.PrimaryEmail}
                            </p>
                        </div>
                        <div className="ml-6">
                            <img
                                src={applicantDetails.ProfilePictureUrl}
                                alt="ProfilePicture"
                                className="w-32 h-32 rounded-full"
                            />
                        </div>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                        <h3 className="text-lg underline font-bold mb-3">
                            Personal Details
                        </h3>
                        <p className="mb-1">
                            <span className="font-bold">First Name:</span>{" "}
                            {applicantDetails.FirstName}
                        </p>
                        <p className="mb-1">
                            <span className="font-bold">Middle Name:</span>{" "}
                            {applicantDetails.MiddleName || "N/A"}
                        </p>
                        <p className="mb-1">
                            <span className="font-bold">Last Name: </span>{" "}
                            {applicantDetails.LastName}
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Date of Birth:</span>{" "}
                            {applicantDetails.DOB}
                        </p>
                        <h3 className="underline text-lg font-bold mt-6 mb-3">
                            Contact Information
                        </h3>
                        <p className="mb-1">
                            <span className="font-bold">Primary Phone:</span>{" "}
                            {applicantDetails.PrimaryPhoneNumber}
                        </p>
                        {applicantDetails.AlternatePhoneNumbers && (
                            <p className="mb-1">
                                <span className="font-bold">
                                    Alternate Phone:
                                </span>{" "}
                                {applicantDetails.AlternatePhoneNumbers}
                            </p>
                        )}
                        <p className="mb-1">
                            <span className="font-bold">Primary E-mail:</span>{" "}
                            {applicantDetails.PrimaryEmail}
                        </p>
                        {applicantDetails.AlternateEmails && (
                            <p className="mb-1">
                                <span className="font-bold">
                                    Alternate Emails:
                                </span>{" "}
                                {applicantDetails.AlternateEmails}
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
};

export default ApplicantsDetails;
