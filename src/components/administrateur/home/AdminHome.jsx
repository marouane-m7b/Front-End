import './AdminHome.css';
import Tickets from './components/Tickets';

const AdminHome = () => {

    return (
        <>
            <h1 className="p-relative">Dashboard</h1>
            <div className="wrapper-full d-grid gap-20">
                <Tickets />
            </div>
        </>
    )
}

export default AdminHome;