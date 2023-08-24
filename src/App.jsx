import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/utils/Layout";
import DashboardContent from "./components/dashboard/DashboardContent";
import ChooseSubjectPDF from "./pages/ChooseSubjectPDF";
import ChooseChapters from "./components/information/ChooseChapters";
import ResultPage from "./pages/ResultPage";
import ShowPdfPage from "./pages/ShowPdfPage";
import MCQsPracticePage from "./pages/MCQsPracticePage";
import FungatPage from "./pages/FungatPage";
import MdcatPage from "./pages/MdcatPage";
import TextbooksPage from "./pages/TextbooksPage";
import ForcesPge from "./pages/ForcesPge";
import LiteraturePage from "./pages/LiteraturePage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProtectedRoute from "./components/utils/PtotectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardContent />}></Route>
          <Route path="/choose" element={<ChooseSubjectPDF />}></Route>
          <Route path="/choose/chapters" element={<ChooseChapters />}></Route>
          <Route path="/show" element={<ShowPdfPage />}></Route>
          <Route path="/results" element={<ResultPage />}></Route>
          <Route path="/practice" element={<MCQsPracticePage />}></Route>
          <Route path="/mdcat" element={<MdcatPage />}></Route>
          <Route path="/fungat" element={<FungatPage />}></Route>
          <Route path="/textbooks" element={<TextbooksPage />}></Route>
          <Route path="/forces" element={<ForcesPge />}></Route>
          <Route path="/literature" element={<LiteraturePage />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
