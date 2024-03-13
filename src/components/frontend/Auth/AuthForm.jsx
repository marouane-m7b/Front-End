import "./auth.css"
import PropTypes from 'prop-types';
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";

const AuthForm = ({ handleAddAuth }) => {

  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <div className="wrapper-auth">
        <div className="card-switch-auth">

          <div className="switch-auth">
            <input className="toggle" id="toggle" type="checkbox" onChange={(e) => setChecked(e.target.checked)} checked={checked} />
            <label htmlFor="toggle">
              <span className="slider" />
              <span className="card-side" />
            </label>
            <div className="flip-card__inner">
              <Login handleAddAuth={handleAddAuth} />
              <Register handleCheck={handleCheck} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

AuthForm.propTypes = {
  handleAddAuth: PropTypes.func.isRequired,
};

export default AuthForm;
