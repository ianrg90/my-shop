import { useNavigate, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { authActions } from "../../../store/auth-slice";
import Button from "../../UI/Button";

function Header(props) {
  const uiState = useSelector((state) => state.ui);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { loading, status } = uiState;
  const errorOrLoadingState = loading || status === "Error!";
  const hideInPaths =
    location.pathname === "/login" || location.pathname === "/user";

  const showLogout = location.pathname === "/login";

  function logout (){
    dispatch(authActions.logUserOut())
  }

  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.action}>
          {!errorOrLoadingState && !hideInPaths && (
            <Button
              to="/user"
              text={<FontAwesomeIcon icon={faArrowLeft}/>}
              onClick={() => navigate(-1)}
            />
          )}
          <h1 className={classes.title}>{props.text}</h1>
        </div>
        {!errorOrLoadingState && !showLogout && (
          <button onClick = {logout} className={classes.logout}>Logout</button>
        )}
      </div>
    </header>
  );
}

export default Header;
