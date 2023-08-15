import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import DashboardContent from "./components/DashboardContent";
import AddSkills from "./components/AddSkills";
import ChooseSubjectPDF from "./pages/ChooseSubjectPDF";
import ChooseChapters from "./components/ChooseChapters";
import PdfShow from "./components/PdfShow";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardContent />}></Route>
          <Route path="/skills" element={<AddSkills />}></Route>
          <Route path="/choose" element={<ChooseSubjectPDF />}></Route>
          <Route path="/choose/chapters" element={<ChooseChapters />}></Route>
          <Route path="/show" element={<PdfShow />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
