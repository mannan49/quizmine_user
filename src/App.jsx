import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import DashboardContent from "./components/DashboardContent";
import AddSkills from "./components/AddSkills";
import ChooseSubjectPDF from "./pages/ChooseSubjectPDF";
import ChooseChapters from "./components/ChooseChapters";
import PdfShow from "./components/PdfShow";
import ResultPage from "./pages/ResultPage";
import TestInformation from "./components/TestInformation";
import PracticeMCQs from "./components/PracticeMCQs";
import ShowPdfPage from "./pages/ShowPdfPage";
import MCQsPracticePage from "./pages/MCQsPracticePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardContent />}></Route>
          <Route path="/skills" element={<AddSkills />}></Route>
          <Route path="/choose" element={<ChooseSubjectPDF />}></Route>
          <Route path="/choose/chapters" element={<ChooseChapters />}></Route>
          <Route path="/show" element={<ShowPdfPage />}></Route>
          <Route path="/results" element={<ResultPage />}></Route>
          <Route path="/practice" element={<MCQsPracticePage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
