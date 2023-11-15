import "./styles/styles.css"

import ReactDOM from "react-dom/client"
import { Toaster } from "~/ui/toaster"

import Provider from "./provider"
import Router from "./router"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <Toaster />
    <Router />
  </Provider>
)
