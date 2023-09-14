import { Outlet, useLocation, useParams } from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
    const { id } = useParams();
    const location = useLocation();

    const placePageLayout = location.pathname === `/place/${id}`;



    return (
        <div className={placePageLayout ? "place-page-layout" : "layout"}>
                <NavBar />
                <Outlet />
        </div>
    );
}

export default Layout;