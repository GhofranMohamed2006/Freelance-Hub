import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const PublicLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

export default PublicLayout;