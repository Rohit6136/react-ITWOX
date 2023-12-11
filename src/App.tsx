import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "pages/homepage/HomePage";
import Header from "components/Header/Header";
import Dashboard from "pages/dashboard/Dashboard";

import LoginForm from "pages/login/LoginForm";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<LoginForm />}></Route>
          <Route path="/" element={<Header />}>
            <Route path="" element={<HomePage />}></Route>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
