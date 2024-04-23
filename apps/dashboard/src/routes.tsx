import { createBrowserRouter, Navigate } from "react-router-dom"

import AccountLayout from "./components/account-layout"
import ProtectedRoute from "./components/protected-route"
import AccountForm from "./pages/account-form"
import Accounts from "./pages/accounts"
import Appearance from "./pages/appearance"
import Categories from "./pages/categories"
import ClientForm from "./pages/client-form"
import Clients from "./pages/clients"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import NotFound from "./pages/not-found"
import Profile from "./pages/profile"
import Register from "./pages/register"
import Report from "./pages/report"
import Reports from "./pages/reports"
import Tracker from "./pages/tracker"
import Settings from "./pages/settings"
import Transactions from "./pages/transactions"
import TransactionsForm from "./pages/transactions-form"

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/reports/:id", element: <Report /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <Navigate to="/overview" replace /> },
      { path: "/overview", element: <Dashboard /> },
      { path: "/overview/:accountId", element: <Dashboard /> },
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
      { path: "/tracker", element: <Tracker /> },
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
        element: (
          <AccountLayout>
            <AccountForm />
          </AccountLayout>
        ),
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
