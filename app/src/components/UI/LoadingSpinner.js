import { Fragment } from "react";
import { useSelector } from "react-redux";
import Header from "../layout/header/Header";
import classes from "./LoadingSpinner.module.css";

function LoadingSpinner() {

  const uiState = useSelector(state => state.ui)
  const {status} = uiState
  const {message} = uiState

  return (
    <Fragment>
      <Header text= {`${status} : ${message}`} />
      <div className={classes.center}>
        <div className={classes.spinner}></div>
      </div>
    </Fragment>
  );
}

export default LoadingSpinner;
