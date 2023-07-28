import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import ApplicantsPage from "./pages/Applicants";
import AssessmentTestPage from "./pages/AssessmentTest";
import Dashboard from "./pages/Dashboard";
import InterviewPage from "./pages/Interview";
import InterviewerPage from "./pages/Interviewer";
import OfferLetterPage from "./pages/OfferLetter";
import TemplatePage from "./pages/Template";
import JobPostings from "./pages/JobPostings";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/applicants" element={<ApplicantsPage />} />
                    <Route path="/jobs" element={<JobPostings />} />
                    <Route path="/interview" element={<InterviewPage />} />
                    <Route path="/interviewer" element={<InterviewerPage />} />
                    <Route path="/template" element={<TemplatePage />} />
                    <Route
                        path="/assessmentTest"
                        element={<AssessmentTestPage />}
                    />
                    <Route path="/offerLetter" element={<OfferLetterPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
