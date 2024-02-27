import { createBrowserRouter, Navigate } from "react-router-dom"

import ProtectedRoute from "./components/protected-route"
import AccountForm from "./pages/account-form"
import Accounts from "./pages/accounts"
import Appearance from "./pages/appearance"
import ClientForm from "./pages/client-form"
import Clients from "./pages/clients"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import NotFound from "./pages/not-found"
import Profile from "./pages/profile"
import Register from "./pages/register"
import Reports from "./pages/reports"
import Settings from "./pages/settings"
import Transactions from "./pages/transactions"
import TransactionsForm from "./pages/transactions-form"
import Categories from "./pages/categories"

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/:accountId", element: <Dashboard /> },
      {
        path: "/clients",
        children: [
          {
            path: "/clients",
            element: <Clients />,
          },
          {
            path: "/clients/:id",
            element: <ClientForm />,
          },
        ],
      },
      {
        path: "/transactions",
        children: [
          {
            path: "/transactions",
            element: <Transactions />,
          },
          {
            path: "/transactions/:id",
            element: <TransactionsForm />,
          },
        ],
      },
      {
        path: "/accounts/",
        element: <Accounts />,
      },
      {
        path: "/accounts/:id",
        element: <AccountForm />,
      },
      {
        path: "/settings/",
        element: <Settings />,
        children: [
          {
            path: "",
            element: <Navigate to="profile" replace />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "appearance",
            element: <Appearance />,
          },
        ],
      },
      { path: "/reports", element: <Reports /> },
      { path: "/categories", element: <Categories /> },
      { path: "/404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
])
