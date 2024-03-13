import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faUserShield, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';

function Login({ handleAddAuth }) {
  const [loginInput, setLoginInput] = useState({
    email: "",
    mot_de_passe: "",
    role: "administrateur",
    errors: {
      email: "",
      mot_de_passe: "",
    },
  });

  const handleLoginInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setLoginInput((prevValue) => ({ ...prevValue, [key]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const res = await axios.post(`/api/${loginInput.role}/login`, loginInput);

      if (res.data.status === 200) {
        localStorage.setItem("login_token", res.data.token);
        localStorage.setItem("login_image", res.data.image);
        localStorage.setItem("login_role", res.data.role);
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });
        switch (loginInput.role) {
          case "administrateur":
            handleAddAuth("administrateur");
            break;
          case "moderateur":
            handleAddAuth("moderateur");
            break;
          case "vendeur":
            handleAddAuth("vendeur");
            break;
          case "client_vendeur":
            handleAddAuth("client_vendeur");
            break;
          default:
            return;
        }
      } else if (res.data.status === 422) {
        setLoginInput((prevValue) => ({
          ...prevValue,
          errors: res.data.errors,
        }));
      } else if (res.data.status === 401) {
        Swal.fire({
          title: "...Oops",
          text: res.data.message,
          icon: "error",
        });
        setLoginInput({
          ...loginInput,
          errors: {
            email: "",
            mot_de_passe: "",
          },
        });
      }
    } catch (error) {
      console.error("Error during loggin in", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flip-card__front">
      <span></span>
      <div className="title">Log in</div>
      <form onSubmit={handleLogin} action="" className="flip-card__form">
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="flip-card__input"
            value={loginInput.email}
            onChange={handleLoginInput}
          />
          <div className="error-inp">{loginInput.errors.email}</div>
        </div>
        <div>
          <input
            type="password"
            minLength={8}
            maxLength={32}
            placeholder="Mot de passe"
            name="mot_de_passe"
            className="flip-card__input"
            value={loginInput.mot_de_passe}
            onChange={handleLoginInput}
          />
          <div className="error-inp">{loginInput.errors.mot_de_passe}</div>
        </div>
        <section>
          <label htmlFor="administrateur" className='label'>
            <input
              type="radio"
              id="administrateur"
              name="role"
              value="administrateur"
              checked={loginInput.role === "administrateur"}
              onChange={handleLoginInput}
              className="input"
            />
            <FontAwesomeIcon icon={faUserCog} />
          </label>
          <label htmlFor="moderateur" className='label'>
            <input
              type="radio"
              id="moderateur"
              name="role"
              value="moderateur"
              checked={loginInput.role === "moderateur"}
              onChange={handleLoginInput}
              className="input"
            />
            <FontAwesomeIcon icon={faUserShield} />
          </label>
          <label htmlFor="vendeur" className='label'>
            <input
              type="radio"
              id="vendeur"
              name="role"
              value="vendeur"
              checked={loginInput.role === "vendeur"}
              onChange={handleLoginInput}
              className="input"
            />
            <FontAwesomeIcon icon={faShoppingBag} /> 
          </label>
          <label htmlFor="client_vendeur" className='label'>
            <input
              type="radio"
              id="client_vendeur"
              name="role"
              value="client_vendeur"
              checked={loginInput.role === "client_vendeur"}
              onChange={handleLoginInput}
              className="input"
            />
            <FontAwesomeIcon icon={faUser} /> 
          </label>
        </section>
        <div>{loginInput.role}</div>

        <button className="flip-card__btn">
          {isSubmitting ? "Loading..." : "Let`s go!"}
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  handleAddAuth: PropTypes.func.isRequired,
};

export default Login;
