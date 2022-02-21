import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Header from "../layout/header/Header";
import classes from "./Error.module.css";
import Button from "./Button";

function Error() {
  const uiState = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { status, message } = uiState;

  function changeUI() {
    dispatch(
      uiActions.changeUiState({
        loading: false,
        status: null,
        message: null,
      })
    );

    navigate("/login", {replace: true})
  }

  return (
    <Fragment>
      <Header text={status} />
      <div className={classes.layout}>
        <h1>{message}</h1>
        <div className={classes.actions}>
          <Button text="Ok !" onClick = {changeUI} />
        </div>
      </div>
    </Fragment>
  );
}

export default Error;
