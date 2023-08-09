import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const InterviewCalendar = ({
    applicants,
    interviewers,
    interviews,
    setInterviews,
    handleDeleteInterview,
}) => {
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {
        const getName = async (id) => {
            if (id) {
                const applicant = applicants.find(
                    (applicant) => applicant.id === id
                );
                console.log(applicants);
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
                        };
                    }
                    return null; // Return null or handle the case when applicantId is undefined
                })
            );

            // Remove null entries from the eventsArray
            const filteredEventsArray = eventsArray.filter(
                (event) => event !== null
            );

            console.log("interviewers", interviewers);
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
    console.log(calendarEvents);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleEventClicked = async (eventInfo) => {
        try {
            const clickEventId = eventInfo.event.id;
            await handleDeleteInterview(clickEventId);
            setInterviews((prev) =>
                prev.filter((item) => item.id !== clickEventId)
            );
            eventInfo.event.remove();
            console.log("clickEventId", clickEventId);
        } catch (error) {
            console.log(error);
        }
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
                                select={() => handleOpen()}
                                eventClick={handleEventClicked}
                                eventsSet={(events) =>
                                    setCalendarEvents(events)
                                }
                                initialEvents={[...calendarEvents]}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default InterviewCalendar;
