import "./styles/styles.css"

import ReactDOM from "react-dom/client"
import { Toaster } from "~/ui/toaster"

import Providers from "./providers"

import Layout from "./components/new-layout"
import Account from "./pages/account"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import NotFound from "./pages/not-found"
import Clients from "./pages/clients"
import Transactions from "./pages/transactions"
import TransactionsForm from "./pages/transactions-form"
import Reports from "./pages/reports"
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route
          path="/account"
          handle={{
            crumb: {
              label: "Conta",
              path: "/account",
            },
          }}
          element={<Account />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:accountId" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route
          path="/transactions"
          element={<Transactions />}
          handle={{
            crumb: {
              label: "Transações",
              path: "/transactions",
            },
          }}
        />
        <Route
          path="/transactions/:id"
          element={<TransactionsForm />}
          handle={{
            crumb: {
              label: "Formulário de Transações",
              path: "/account",
            },
          }}
        />
        <Route path="/reports" element={<Reports />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <Toaster />
    <RouterProvider router={router} />
  </Providers>
)
