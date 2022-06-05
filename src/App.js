import React from "react";
import { Dashboard, Login, PrivateRoute, Error } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wrapper from "./pages/Wrapper";

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                {" "}
                <Dashboard></Dashboard>{" "}
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
