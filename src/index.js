import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import "./output.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import AppProvider from "./context/AppContext.tsx";
import Notification from "./components/NotificationComponent.tsx";

function App() {
  return (
    <AppProvider>
      <Notification/>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
