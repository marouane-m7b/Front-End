import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import ModerateurDrawer from './ModerateurDrawer';
import ModerateurNavbar from './ModerateurNavbar';



function ModerateurSideBar({ handleRemoveAuth }) {

    return (
        <div className="page d-flex">
            <ModerateurDrawer handleRemoveAuth={handleRemoveAuth} />
            <div className="content w-full">
                <ModerateurNavbar />
                <Outlet />
            </div>
        </div>
    );
}

ModerateurSideBar.propTypes = {
    handleRemoveAuth: PropTypes.func.isRequired,
};


export default ModerateurSideBar