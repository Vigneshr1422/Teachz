import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList"; // adjust path
import StudentView from "./pages/StudentView"; // adjust path
import SubjectVise from "./pages/SubjectWise"; // adjust path



function App() {
  return (
    <Routes>
      {/* All these pages will share Navbar */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/student-list" element={<StudentList />} />
                <Route path="/student-view" element={<StudentView />} />
                <Route path="/subject-wise" element={<SubjectVise />} />



        {/* Add more routes here later like dashboard, profile, etc. */}
      </Route>
    </Routes>
  );
}

export default App;
