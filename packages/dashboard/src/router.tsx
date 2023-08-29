import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import ProtectedRoute from "./components/protected-route"
import Dashboard from "./views/dashboard"
import Login from "./views/login"
import NotFound from "./views/not-found"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
