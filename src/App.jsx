import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import ApplicantsPage from "./pages/Applicants";
import AssessmentTestPage from "./pages/AssessmentTest";
import Dashboard from "./pages/Dashboard";
import InterviewPage from "./pages/Interview";
import InterviewerPage from "./pages/Interviewer";
import OfferLetterPage from "./pages/OfferLetter";
import TemplatePage from "./pages/Template";
import JobPostingPage from "./pages/JobPostings";
import ApplicantsListPage from "./pages/Applicants/ApplicantsListPage";
import ApplicantsDetailsPage from "./pages/Applicants/ApplicantDetailsPage";
import BlackListPage from "./pages/Applicants/BlackListPage";
import CandidatesPage from "./pages/Applicants/CandidatesPage";
import ShortListPage from "./pages/Applicants/ShortListPage";
import JobApplicationPage from "./pages/Applicants/JobApplicationPage";
import TemplateEditorPage from "./pages/Template/TemplateEditorPage";
import TemplateListPage from "./pages/Template/TemplateListPage";
import SelectionPage from "./pages/OfferLetter/SelectionPage";
import LetterPreviewPage from "./pages/OfferLetter/LetterPreviewPage";
import LetterListPage from "./pages/OfferLetter/LetterListPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/applicants" element={<ApplicantsPage />}>
                        <Route index element={<ApplicantsListPage />} />
                        <Route path="blacklist" element={<BlackListPage />} />
                        <Route path="candidates" element={<CandidatesPage />} />
                        <Route path="shortlist" element={<ShortListPage />} />
                        <Route
                            path="jobapplication"
                            element={<JobApplicationPage />}
                        />
                        <Route path=":id" element={<ApplicantsDetailsPage />} />
                    </Route>
                    <Route path="/jobs" element={<JobPostingPage />} />
                    <Route path="/interview" element={<InterviewPage />} />
                    <Route path="/interviewer" element={<InterviewerPage />} />
                    <Route path="/template" element={<TemplatePage />}>
                        <Route index element={<TemplateListPage />} />
                        <Route
                            path="editor/:id"
                            element={<TemplateEditorPage />}
                        />
                    </Route>
                    <Route
                        path="/assessmentTest"
                        element={<AssessmentTestPage />}
                    />
                    <Route path="/offerLetter" element={<OfferLetterPage />}>
                        <Route index element={<LetterListPage />} />
                        <Route path="create" element={<SelectionPage />} />
                        <Route path="preview" element={<LetterPreviewPage />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
