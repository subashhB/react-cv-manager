import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const InterviewCalendar = ({
    applicants,
    interviewers,
    interviews,
    setInterviews,
    candidates,
    handleDeleteInterview,
    handleAddNewInterview,
}) => {
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [title, setTitle] = useState("");
    const [interviewerId, setInterviewerId] = useState(1);
    const [candidateId, setCandidateId] = useState(1);
    const [interviewType, setInterviewType] = useState("");
    const [calendarApi, setCalendarApi] = useState(null);

    useEffect(() => {
        const getName = async (id) => {
            if (id) {
                const applicant = applicants.find(
                    (applicant) => applicant.id === id
                );
                const applicantName = `${applicant.FirstName} ${
                    applicant.MiddleName ? `${applicant.MiddleName} ` : ""
                }${applicant.LastName}`;
                return applicantName;
            }
        };

        const generateEventsArray = async () => {
            const eventsArray = await Promise.all(
                interviews.map(async (interview) => {
                    const applicantId = interview.Candidates?.ApplicantsId; // Use optional chaining
                    if (applicantId) {
                        const Name = await getName(applicantId);

                        return {
                            id: interview.id,
                            title: `${interview.Title} of ${Name} by ${
                                interviewers.find(
                                    (interviewer) =>
                                        interviewer.id ===
                                        interview.InterviewersId
                                )?.Name
                            } (${interview.InterviewType})`, // Use optional chaining
                            date: interview.date,
                            allDay: false,
                        };
                    }
                    return null; // Return null or handle the case when applicantId is undefined
                })
            );

            // Remove null entries from the eventsArray
            const filteredEventsArray = eventsArray.filter(
                (event) => event !== null
            );
            return filteredEventsArray;
        };
        const fetchEvents = async () => {
            try {
                const eventsArray = await generateEventsArray();
                setCalendarEvents(eventsArray);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        if (interviews.length > 0) {
            fetchEvents();
        }
    }, [applicants, interviewers, interviews]);
    const interviewTypes = [
        { id: 1, type: "HR Assessment" },
        { id: 2, type: "Technical Assessment" },
        { id: 3, type: "Negotiation Round" },
    ];
    const handleOpen = (info) => {
        if (info) {
            const eventDate = info.start;
            const year = eventDate.getFullYear();
            const month = String(eventDate.getMonth() + 1).padStart(2, "0");
            const day = String(eventDate.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            setDate(formattedDate);
            setCalendarApi(info.view.calendar);
        }
        setOpen(true);
    };
    const handleClose = () => {
        setTitle("");
        setDate("");
        setCandidateId(0);
        setInterviewerId(0);
        setInterviewType("");
        setTime("");
        setOpen(false);
    };

    const handleApplicantName = (id) => {
        const applicant = applicants.find((person) => person.id === id);
        const applicantName = `${applicant.FirstName} ${
            applicant.MiddleName ? `${applicant.MiddleName} ` : ""
        }${applicant.LastName}`;
        return applicantName;
    };

    const handleEventClicked = async (eventInfo) => {
        try {
            const clickEventId = eventInfo.event.id;
            await handleDeleteInterview(clickEventId);
            setInterviews((prev) =>
                prev.filter((item) => item.id !== clickEventId)
            );
            eventInfo.event.remove();
        } catch (error) {
            console.log(error);
        }
    };
    const handleScheduleInterview = () => {
        const scheduledInterview = {
            InterviewType: interviewType,
            CandidatesId: candidateId,
            Title: title,
            InterviewersId: interviewerId,
            date: `${date}T${time}`,
        };
        const candidate = candidates.find(
            (candidate) => candidate.id === candidateId
        );
        const applicant = applicants.find(
            (applicant) => applicant.id === candidate.ApplicantsId
        );
        const interviewer = interviewers.find(
            (person) => person.id === interviewerId
        );
        const interviewState = { ...scheduledInterview, Applicants: applicant };

        axios
            .post("http://localhost:3001/Interviews", scheduledInterview)
            .then((response) => {
                const id = response.data.id;
                handleAddNewInterview(id, interviewState);
                const newCalendarEvent = {
                    id: id,
                    title: `${title} of ${handleApplicantName(
                        applicant.id
                    )} by ${interviewer.Name}`,
                    date: `${date}T${time}`,
                };
                calendarApi.addEvent(newCalendarEvent);
                calendarApi.unselect();
            });
        handleClose();
    };
    return (
        <>
            <Box>
                <Typography variant="h5" className="text-gray-700">
                    Interview Calendar
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Box flex="1 1 20%" p="15px" borderRadius="4px">
                        <Typography>Interviews</Typography>
                        <List>
                            {interviews.map((interview) => (
                                <ListItem
                                    key={interview.id}
                                    className="my-2 bg-secondary rounded-sm p-1"
                                >
                                    <ListItemText>
                                        {interview.Title}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box flex="1 1 80%" ml="15px">
                        {calendarEvents.length > 0 && (
                            <FullCalendar
                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    interactionPlugin,
                                    listPlugin,
                                ]}
                                headerToolbar={{
                                    left: "prev, next today",
                                    center: "title",
                                    right: "dayGridMonth, timeGridWeek, timeGridDay, listMonth",
                                }}
                                initialView="dayGridMonth"
                                editable={false}
                                eventDragStart={false}
                                selectMirror={true}
                                selectable={true}
                                select={(info) => handleOpen(info)}
                                eventClick={handleEventClicked}
                                eventContent={({ event }) => (
                                    <div className="cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis bg-blue-400 text-white mx-1 rounded">
                                        {event.title}
                                    </div>
                                )}
                                eventsSet={(events) =>
                                    setCalendarEvents(events)
                                }
                                initialEvents={[...calendarEvents]}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    className=" absolute  text-centerter rounded-lg text-gray-800 top-[8%] left-[30%] w-[650px] h-[600px] shadow-lg p-16 bg-white"
                    position="relative"
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Add a new Interview
                    </Typography>
                    <Box
                        sx={{ marginTop: 4, minWidth: 120 }}
                        id="modal-modal-description"
                    >
                        <FormControl sx={{ marginBottom: 2 }} fullWidth>
                            <TextField
                                className="my-2"
                                id="simple-textfield"
                                label="Title"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="interviewTypes">
                                Interview Types
                            </InputLabel>
                            <Select
                                labelId="interviewTypes"
                                id="demo-simple-select"
                                className="my-2"
                                label="Interview Type"
                                value={interviewType}
                                onChange={(e) => {
                                    setInterviewType(e.target.value);
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Select Interview Types
                                </MenuItem>
                                {interviewTypes.map((interviewType) => (
                                    <MenuItem
                                        value={interviewType.type}
                                        key={interviewType.id}
                                    >
                                        {interviewType.type}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Box className="ms-1 mt-4 mb-6">
                                <label htmlFor="time-picker" className="mr-2">
                                    Interview Schedule Time:
                                </label>
                                <input
                                    id="time-picker"
                                    type="time"
                                    value={time}
                                    onChange={(e) => {
                                        setTime(e.target.value);
                                    }}
                                />
                            </Box>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="select-candidate">
                                Candidate
                            </InputLabel>
                            <Select
                                labelId="select-candidate"
                                id="demo-simple-candidate-select"
                                className="mb-2"
                                label="Candidate"
                                value={candidateId}
                                onChange={(e) => {
                                    setCandidateId(e.target.value);
                                }}
                            >
                                <MenuItem value={0} disabled>
                                    Select Candidate
                                </MenuItem>
                                {candidates.map((candidate) => (
                                    <MenuItem
                                        value={candidate.id}
                                        key={candidate.id}
                                    >
                                        {handleApplicantName(
                                            candidate.ApplicantsId
                                        )}
                                        {", "}
                                        {
                                            applicants.find(
                                                (applicant) =>
                                                    applicant.id ===
                                                    candidate.ApplicantsId
                                            ).PrimaryEmail
                                        }
                                        {", "}
                                        {
                                            applicants.find(
                                                (applicant) =>
                                                    applicant.id ===
                                                    candidate.ApplicantsId
                                            ).PrimaryPhoneNumber
                                        }
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="select-interviewer">
                                Interviewer
                            </InputLabel>
                            <Select
                                labelId="select-interviewer"
                                id="demo-simple-interviewer-select"
                                className="mt-3 mb-2"
                                label="Status"
                                value={interviewerId}
                                onChange={(e) => {
                                    setInterviewerId(e.target.value);
                                }}
                            >
                                <MenuItem value={0} disabled>
                                    Select Interviewer
                                </MenuItem>
                                {interviewers.map((interviewer) => (
                                    <MenuItem
                                        value={interviewer.id}
                                        key={interviewer.id}
                                    >
                                        {`${interviewer.Name}, ${interviewer.Email}, ${interviewer.Phone}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box className="w-5/6 flex absolute left-[11.25rem] bottom-10 mt-4">
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                handleScheduleInterview();
                            }}
                            disabled={
                                title === "" ||
                                interviewType === "" ||
                                time === "" ||
                                candidateId < 1 ||
                                interviewerId < 1
                            }
                        >
                            Schedule Interview
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default InterviewCalendar;
