import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button";

function Header(props) {
  const uiState = useSelector((state) => state.ui);
  const location = useLocation();
  const navigate = useNavigate()

  const { loading, status } = uiState;
  const errorOrLoadingState = !loading && status !== "Error!";
  const hideInPaths =
    location.pathname === "/login" || location.pathname === "/user";

  return (
    <header className={classes.header}>
      {errorOrLoadingState && !hideInPaths && (
        <div className={classes.action}>
          <Button to="/user" text={<FontAwesomeIcon icon={faArrowLeft} />} onClick = {() => navigate(-1)} />
        </div>
      )}
      <h1>{props.text}</h1>
    </header>
  );
}

export default Header;
