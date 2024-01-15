import "./styles/styles.css"

import ReactDOM from "react-dom/client"
import { Toaster } from "~/ui/toaster"

import Providers from "./providers"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <Toaster />
    <RouterProvider router={router} />
  </Providers>
)
