import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Layout from "./components/layout"
import Account from "./pages/account"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import NotFound from "./pages/not-found"
import Clients from "./pages/clients"
import Transactions from "./pages/transactions"
import TransactionsForm from "./pages/transactions-form"
import Reports from "./pages/reports"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:accountId" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/:id" element={<TransactionsForm />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
