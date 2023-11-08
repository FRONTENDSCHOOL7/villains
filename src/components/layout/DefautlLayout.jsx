import { Outlet } from "react-router"
import { Wrap } from "./PageTemplate.style"

const DefaultLayout = () => {

    return <Wrap>
        <Outlet/>
    </Wrap>
}

export default DefaultLayout