import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "store/slices/auth";
import Button from "components/Button/Button";
import "./LoginForm.css";

interface UserCredentials {
  email: string;
  password: string;
}

const defaultUserCredentials: UserCredentials = {
  email: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>(
    defaultUserCredentials
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserCredentials((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setUserCredentials((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setLogin({ userCredentials }));
    localStorage.setItem("userData", JSON.stringify(userCredentials));
    navigate("/dashboard");
  };

  return (
    <div className="form-box">
      <div className="form-container">
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <div className="field-box">
            <label htmlFor="email" className="form-group">
              Email
            </label>
            <input
              required
              id="email"
              type="email"
              value={userCredentials.email}
              onChange={handleEmail}
              className={`form-group`}
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-group">
              Password
            </label>
            <input
              required
              id="password"
              onChange={handlePassword}
              type="password"
              className={`form-group`}
              placeholder="Password"
              value={userCredentials.password}
            />
          </div>

          <Button
            type="submit"
            text="Submit"
            className="common-button field-box"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
