import { Fragment } from "react";
import Header from "../layout/header/Header";
import Main from "../layout/main/Main";
import classes from "../../pages/LoginPage.module.css";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";

function Signup(props) {

  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    fieldHasError: nameHasError,
    handleEnteredValue: handleEnteredName,
    handleInputTouch: handleNameTouch,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

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

  const {
    enteredValue: enteredConfirmPassword,
    valueIsValid: confirmedPasswordIsValid,
    fieldHasError: confirmedPasswordHasError,
    handleEnteredValue: handleEnteredConfirmedPassword,
    handleInputTouch: handleConfirmedPasswordTouched,
    reset: resetConfirmPassword,
  } = useInput((value) => value === enteredPassword);

  function submitForm(e) {
    e.preventDefault();

    if (
      !nameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !confirmedPasswordIsValid
    ) {
      alert("Please complete all fields before submiting the form!");
      return;
    }

    const user = {
      username: enteredName,
      userEmail: enteredEmail,
      userPassword: enteredPassword,
    };
    resetName();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
    console.log(user);

    props.onChangePage()

  }

  return (
    <Fragment>
      <Header text="Signup" />
      <Main>
        <form>
          <div className={classes["form-control"]}>
            {nameHasError && <label>Favor preencher o campo abaixo</label>}
            <input
              type="text"
              placeholder="Nome da oficina"
              onChange={handleEnteredName}
              onBlur={handleNameTouch}
              value={enteredName}
            />
            {emailHasError && <label>Email inválido!</label>}
            <input
              type="email"
              placeholder="Email"
              onChange={handleEnteredEmail}
              onBlur={handleEmailTouched}
              value={enteredEmail}
            />
            {passwordHasError && (
              <label>Senha tem que ter no mínimo 6 digitos</label>
            )}
            <input
              type="password"
              placeholder="Senha"
              onChange={handleEnteredPassword}
              onBlur={handlePasswordTouched}
              value={enteredPassword}
            />
            {confirmedPasswordHasError && <label>Senhas não são iguais</label>}
            <input
              type="password"
              placeholder="Confirme sua senha"
              onChange={handleEnteredConfirmedPassword}
              onBlur={handleConfirmedPasswordTouched}
              value={enteredConfirmPassword}
            />
          </div>
          <Button text="Criar conta" type="submit" onClick={submitForm} />
          <div className={classes["change-page-link"]}>
            <p onClick={props.onChangePage}>Já tem uma conta?</p>
          </div>
        </form>
      </Main>
    </Fragment>
  );
}

export default Signup;
