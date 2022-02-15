import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { damageActions } from "../store/damages-slice";
import { Link } from "react-router-dom";
import Header from "../components/layout/header/Header";
import Main from "../components/layout/main/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faArrowAltCircleRight,
  faWrench
} from "@fortawesome/free-solid-svg-icons";
import classes from "./UserOptionsPage.module.css";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Error from "../components/UI/Error";

//Replace after
const DUMMY_DATA = "Retocar";

function UserOptionsPage() {
  const uiState = useSelector((state) => state.ui);
  const { loading, status } = uiState;
  const dispatch = useDispatch();

  const hasError =  status === "Error!";

  //Make sure the damages list is always empty whem entering the damagelist component
  useEffect(() => {
    dispatch(damageActions.clearDamages());
  }, [dispatch]);

  return (
    <Fragment>
      {!loading && !hasError && <Header text={DUMMY_DATA} />}
      <Main>
        {!loading && !hasError && (
          <div className={classes["user-menu"]}>
             <div className={classes["user-menu-item"]}>
              <Link to="/user/services">
                <FontAwesomeIcon icon={faWrench} size="2x" />
                <p>Criar Serviços</p>
              </Link>
            </div>
            <div className={classes["user-menu-item"]}>
              <Link to="/user/new-quote">
                <FontAwesomeIcon icon={faDollarSign} size="2x" />
                <p>Criar orçamento</p>
              </Link>
            </div>
            <div className={classes["user-menu-item"]}>
              <Link to="/user/quote-list">
                <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" />
                <p>Ver orçamentos</p>
              </Link>
            </div>
          </div>
        )}
      </Main>
      {loading && !hasError && <LoadingSpinner />}
      {!loading && hasError && <Error />}
    </Fragment>
  );
}

export default UserOptionsPage;
