import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import cookies from "js-cookie"
import Layout from "./components/new-layout"
import Account from "./pages/account"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import NotFound from "./pages/not-found"
import Clients from "./pages/clients"
import Transactions from "./pages/transactions"
import TransactionsForm from "./pages/transactions-form"
import Reports from "./pages/reports"

const Router = () => {
  const layout = JSON.parse(cookies.get("react-resizable-panels:layout") || "")
  const collapsed = Boolean(cookies.get("react-resizable-panels:collapsed"))

  const defaultLayout = layout || undefined
  const defaultCollapsed = collapsed || undefined

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} />}>
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
