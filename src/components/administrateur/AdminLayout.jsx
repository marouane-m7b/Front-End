import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminDrawer from './AdminDrawer';
import AdminNavbar from './AdminNavbar';



function AdminSideBar({ handleRemoveAuth }) {

    return (
        <div className="page d-flex">
            <AdminDrawer handleRemoveAuth={handleRemoveAuth} />
            <div className="content w-full">
                <AdminNavbar />
                <Outlet />
            </div>
        </div>
    );
}

AdminSideBar.propTypes = {
    handleRemoveAuth: PropTypes.func.isRequired,
};


export default AdminSideBar