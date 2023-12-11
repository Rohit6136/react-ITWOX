import Button from "components/Button/Button";
import { getUserData } from "helpers/selector";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { setLogout } from "store/slices/auth";

import "./Header.css"

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } =
    useSelector(getUserData) ||
    JSON.parse(localStorage.getItem("userData") || "{}");

  const isSignedIn = !!email;

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-dark navigationBar"
        data-testid="navigation-component"
      >
        <a className="navbar-brand navbar-light" href="#">
          Navbar
        </a>
        <div>
          {!isSignedIn && (
            <Link to="/sign-in">
              <Button text="Sign in" type="button" />
            </Link>
          )}
          {isSignedIn && (
            <>
              <Link to="/dashboard">
                <Button text="Dashboard" type="button" />
              </Link>
              <Button
                text="Sign Out"
                type="button"
                onClickEvent={handleLogout}
              />
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
