import { createBrowserRouter, Navigate } from "react-router-dom"

import Layout from "./components/new-layout"
import Account from "./pages/account"
import Clients from "./pages/clients"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import NotFound from "./pages/not-found"
import Reports from "./pages/reports"
import Transactions from "./pages/transactions"
import TransactionsForm from "./pages/transactions-form"

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    element: <Layout />,
    children: [
      {
        path: "/account",
        handle: {
          crumb: {
            label: "Conta",
            route: "/account",
          },
        },
        element: <Account />,
      },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/:accountId", element: <Dashboard /> },
      {
        path: "/clients",
        handle: {
          crumb: {
            label: "Clientes e Fornecedores",
            route: "/clients",
          },
        },
        children: [
          {
            path: "/clients",
            element: <Clients />,
            handle: {
              crumb: {
                label: "Listagem",
              },
            },
          },
          {
            path: "/clients/:id",
            element: <TransactionsForm />,
            handle: {
              crumb: {
                label: "Formulário",
              },
            },
          },
        ],
      },
      {
        path: "/transactions",
        handle: {
          crumb: {
            label: "Transações",
            route: "/transactions",
          },
        },
        children: [
          {
            path: "/transactions",
            element: <Transactions />,
            handle: {
              crumb: {
                label: "Listagem",
              },
            },
          },
          {
            path: "/transactions/:id",
            element: <TransactionsForm />,
            handle: {
              crumb: {
                label: "Formulário",
              },
            },
          },
        ],
      },
      { path: "/reports", element: <Reports /> },
      { path: "/404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
])
