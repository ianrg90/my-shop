import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header/Header";
import Main from "../layout/main/Main";
import classes from "../../pages/LoginPage.module.css";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";

function Signin(props) {
  const navigate = useNavigate();

  const {
    enteredValue: enteredEmail,
    valueIsValid: emailIsValid,
    fieldHasError: emailHasError,
    handleEnteredValue: handleEnteredEmail,
    handleInputTouch: handleEmailTouched,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const {
    enteredValue: enteredPassword,
    valueIsValid: passwordIsValid,
    fieldHasError: passwordHasError,
    handleEnteredValue: handleEnteredPassword,
    handleInputTouch: handlePasswordTouched,
    reset: resetPassword,
  } = useInput((value) => value.trim().length >= 6);

  function submitForm(e) {
    e.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      alert("Please complete all fields before submiting the form!");
      return;
    }

    const user = {
      userEmail: enteredEmail.toLowerCase(),
      userPassword: enteredPassword,
    };

    props.onGetUserLogInfo(user);

    resetEmail();
    resetPassword();

    navigate("/user", { replace: true });
  }

  return (
    <Fragment>
      <Header text="Signin" />
      <Main>
        <div className={classes.logo}>
          <h1>Retocar</h1>
        </div>
        <form>
          <div className={classes["form-control"]}>
            {emailHasError && <label>Email inválido</label>}
            <input
              type="email"
              placeholder="Email"
              onChange={handleEnteredEmail}
              onBlur={handleEmailTouched}
            />
            {passwordHasError && (
              <label>Senha tem que ter no mínimo 6 digitos</label>
            )}
            <input
              type="password"
              placeholder="Senha"
              onChange={handleEnteredPassword}
              onBlur={handlePasswordTouched}
            />
          </div>
          <Button text="Entrar" type="submit" onClick={submitForm} />
          <div className={classes["change-page-link"]}>
            <p onClick={props.onChangePage}>Novo usuário ?</p>
          </div>
        </form>
      </Main>
    </Fragment>
  );
}

export default Signin;
