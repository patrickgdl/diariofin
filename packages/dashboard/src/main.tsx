import "./styles/styles.css"

import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import Providers from "./providers"
import { router } from "./routes"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
)
