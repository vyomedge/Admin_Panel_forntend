import { Outlet } from 'react-router-dom';
import Navbar from "../commen-component/NavBar/Navbar";
const Layout2 = () => (
  <div>
    {/* <h2>Admin Panel Layout</h2> */}
    <Navbar>
    <Outlet />
    </Navbar>
  </div>
);

export default Layout2;
