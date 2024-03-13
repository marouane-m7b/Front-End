import { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { fetchUserData } from "../../../redux/features/vendeur/vendeurSlice";
import Swal from "sweetalert2";
import axios from "axios";
import './invitationList.css'
import Loader from "../../../miniComponents/loader/Loader";
import { Link } from "react-router-dom";

const InvitationList = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autorisations, setAutorisations] = useState([]);

  useEffect(() => {
    dispatch(fetchUserData()).then((data) => setAutorisations(data.payload.client_vendeur));
  }, []);

  const accepterDemande = async (event) => {
    const idAutorisation = event.pivot.id;

    try {
      setIsSubmitting(true)
      const res = await axios.put(`/api/vendeur/autorisation/${idAutorisation}`);

      if (res.data.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success"
        });
        dispatch(fetchUserData()).then((data) => setAutorisations(data.payload.client_vendeur));
      } else {
        console.log(res.data.errors);
      }
    } catch (error) {
      console.error("Error during registration", error);
    } finally {
      setIsSubmitting(false)
    }
  }
  const annulerDemande = async (event) => {
    const idAutorisation = event.pivot.id;

    try {
      setIsSubmitting(true)
      const res = await axios.delete(`/api/vendeur/autorisation/annuler/${idAutorisation}`);

      if (res.data.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success"
        });
        dispatch(fetchUserData()).then((data) => setAutorisations(data.payload.client_vendeur));
      } else {
        console.log(res.data.errors);
      }
    } catch (error) {
      console.error("Error during registration", error);
    } finally {
      setIsSubmitting(false)
    }
  }

  // console.log(autorisations);

  // for (let i = 0; i < autorisations.length; i++) {
  //     if (autorisations.length == 0) {
  //         console.log('no invitation');
  //     } else {
  //         if (autorisations[i].pivot.active == 0) {
  //             console.log({
  //                 accept, refuser: { raison }
  //             });
  //         } else {
  //             console.log(msg);
  //         }
  //     }
  // }

  // const diaplayAutorisationOld = () => {
  //   if (!autorisations?.length) {
  //     return <h3>No Invitation</h3>;
  //   }

  //   return autorisations.map((autorisation, indexAutorisation) => (
  //     <div key={indexAutorisation} style={{ width: 520, margin: '15px auto', border: '1px solid #333', padding: '5px' }}>
  //       <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
  //         <div>
  //           <img
  //             style={{ width: '100px', height: '100px', borderRadius: '50%' }}
  //             src={`https://ofpptecomtest.infinityfreeapp.com/${autorisation?.image}`}
  //             loading="lazy"
  //             alt={`image de ${autorisation?.nom_d_utilisateur}`}
  //           />
  //         </div>
  //         <div className="ms-4 d-flex justify-content-between" style={{ height: '100%', flexDirection: 'column' }}>
  //           <h5>{autorisation?.nom_d_utilisateur}</h5>
  //           {autorisation.pivot.active === 0 ? (
  //             <>
  //               <p>Vous a envoye un autorisation</p>
  //               <div className="btnGroupe" style={{ display: 'grid', justifyContent: 'space-between', gridTemplateColumns: '49% 49%' }}>
  //                 <Button
  //                   variant="solid"
  //                   size="md"
  //                   color="primary"
  //                   aria-label="Explore Bahamas Islands"
  //                   sx={{ fontWeight: 600 }}
  //                   onClick={() => accepterDemande(autorisation)}
  //                 >
  //                   Confirmer
  //                 </Button>
  //                 <Button
  //                   variant="solid"
  //                   size="md"
  //                   sx={{ fontWeight: 600, backgroundColor: '#C7C8CC', color: '#000' }}
  //                   onClick={() => annulerDemande(autorisation)}
  //                 >
  //                   Refuser
  //                 </Button>
  //               </div>
  //             </>
  //           ) : (
  //             <div className="btnGroupe" style={{ display: 'grid', justifyContent: 'space-between', gridTemplateColumns: '49% 49%' }}>
  //               <Button
  //                 variant="solid"
  //                 size="md"
  //                 color="primary"
  //                 aria-label="Explore Bahamas Islands"
  //                 sx={{ fontWeight: 600 }}
  //                 onClick={(e) => alert('envoyer message')}
  //               >
  //                 Envoyer Message
  //               </Button>
  //               <Button
  //                 variant="solid"
  //                 size="md"
  //                 sx={{ fontWeight: 600, backgroundColor: '#C7C8CC', color: '#000' }}
  //                 onClick={(e) => annulerDemande(autorisation)}
  //               >
  //                 Annuler
  //               </Button>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   ));
  // };

  // const diaplayAutorisation = () => {
  //   if (!autorisations?.length) {
  //     return <h3>No Invitation</h3>;
  //   }

  //   return autorisations.map((autorisation, indexAutorisation) => (
  //     <div className="card" key={indexAutorisation} style={{ marginTop: '35px' }}>
  //       <img src={`https://ofpptecomtest.infinityfreeapp.com/${autorisation?.image}`}
  //         loading="lazy"
  //         alt={`image de ${autorisation?.nom_d_utilisateur}`} />
  //       <h2>{autorisation?.nom_d_utilisateur}</h2>
  //       {autorisation.pivot.active === 0 ? (
  //         <>
  //           <p>Sent you a Friend Request!</p>
  //           <div className="buttongroup">
  //             <button onClick={() => accepterDemande(autorisation)}>Confirmer</button>
  //             <button onClick={() => annulerDemande(autorisation)}>Refuser</button>
  //           </div>
  //         </>)
  //         : (
  //           <div className="buttongroup">
  //             <button onClick={() => alert('envoyer message')}>Envoyer Message</button>
  //             <button onClick={() => annulerDemande(autorisation)}>Annuler</button>
  //           </div>
  //         )}
  //     </div>
  //   ));
  // };

  const InvitationSection = () => {
    const invitationAutorisations = autorisations.filter(autorisation => autorisation.pivot.active === 0);

    if (!invitationAutorisations.length) {
      return null;
    }

    return (
      <>
        <h1 style={{ width: "100%", textAlign: "center" }}>Invitations</h1>
        {invitationAutorisations.map((autorisation, indexAutorisation) => (
          <div className="card" key={indexAutorisation} style={{ marginTop: '35px' }}>
            <img
              src={`https://ofpptecomtest.infinityfreeapp.com/${autorisation?.image}`}
              loading="lazy"
              alt={`image de ${autorisation?.nom_d_utilisateur}`}
            />
            <h2>{autorisation?.nom_d_utilisateur}</h2>
            <p>Sent you a Friend Request!</p>
            <div className="buttongroup">
              <button onClick={() => accepterDemande(autorisation)}>Confirmer</button>
              <button onClick={() => annulerDemande(autorisation)}>Refuser</button>
            </div>
          </div>
        ))}
      </>
    );
  };

  const FriendsSection = () => {
    const friendAutorisations = autorisations.filter(autorisation => autorisation.pivot.active === 1);

    if (!friendAutorisations.length) {
      return null;
    }

    return (
      <>
        <h1 style={{ width: "100%", textAlign: "center" }}>Friends</h1>
        {friendAutorisations.map((autorisation, indexAutorisation) => (
          <div className="card" key={indexAutorisation} style={{ marginTop: '35px' }}>
            <img
              src={`https://ofpptecomtest.infinityfreeapp.com/${autorisation?.image}`}
              loading="lazy"
              alt={`image de ${autorisation?.nom_d_utilisateur}`}
            />
            <h2>{autorisation?.nom_d_utilisateur}</h2>
            <div className="buttongroup">
              <Link to={`/vendeur/message/${autorisation.pivot.client_vendeur_id}`}><button>Envoyer Message</button></Link>
              <button onClick={() => annulerDemande(autorisation)}>Annuler</button>
            </div>
          </div>
        ))}
      </>
    );
  };




  return (
    <div className="container d-flex flex-wrap" style={{ gap: "25px", justifyContent: 'center' }}>
      {isSubmitting ? <Loader /> : (
        <>
          <InvitationSection />
          <FriendsSection />
        </>
      )}
    </div>

  )
}

export default InvitationList;