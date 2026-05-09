import { type ReactElement } from "react"
import { Outlet } from "react-router-dom"

function rootOutlet(): ReactElement {
  return <Outlet />
}

export default rootOutlet
