import { Link } from "react-router-dom"

function AdminNavbar() {
  return (
    <div className="head bg-white p-15 between-flex">
      <div className="search p-relative">
        <input className="p-10" type="search" placeholder="Type A Keyword" />
      </div>
      <div className="icons d-flex align-center">
        <span className="notification p-relative">
          <i className="fa-regular fa-bell fa-lg"></i>
        </span>
        <Link to={"/admin/profile"}>
          <img className="rad-half" src={`http://ofpptecomtest.infinityfreeapp.com/${localStorage.getItem("login_image")}`} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default AdminNavbar