import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../redux/features/vendeur/vendeurSlice";
import Overview from "./components/Overview";

const VendeurProfile = () => {
    const dispatch = useDispatch();
    
    const user = useSelector((state) => state.vendeurs.user);
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return (
        <>
        <h1 className="p-relative">Profile</h1>
        <div className="profile-page m-20">
          <Overview/>
        </div>
      </>
    )
}

export default VendeurProfile;