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
      username: enteredName.toLowerCase(),
      userEmail: enteredEmail.toLowerCase(),
      userPassword: enteredPassword,
    };
    resetName();
    resetEmail();
    resetPassword();
    resetConfirmPassword();

    props.onGetUserLogInfo(user);
    props.onChangePage();
  }

  return (
    <Fragment>
      <Header text="Signup" />
      <Main>
        <form>
          <div className={classes["form-control"]}>
            {nameHasError && <label>Field can't be empty</label>}
            <input
              type="text"
              placeholder="Name"
              onChange={handleEnteredName}
              onBlur={handleNameTouch}
              value={enteredName}
            />
            {emailHasError && <label>Invalid email</label>}
            <input
              type="email"
              placeholder="Email"
              onChange={handleEnteredEmail}
              onBlur={handleEmailTouched}
              value={enteredEmail}
            />
            {passwordHasError && (
              <label>Password must have at least 6 digits</label>
            )}
            <input
              type="password"
              placeholder="Password"
              onChange={handleEnteredPassword}
              onBlur={handlePasswordTouched}
              value={enteredPassword}
            />
            {confirmedPasswordHasError && <label>Passwords don't match</label>}
            <input
              type="password"
              placeholder="Confirm password"
              onChange={handleEnteredConfirmedPassword}
              onBlur={handleConfirmedPasswordTouched}
              value={enteredConfirmPassword}
            />
          </div>
          <Button text="Signup" type="submit" onClick={submitForm} />
          <div className={classes["change-page-link"]}>
            <p onClick={props.onChangePage}>Already is registered ?</p>
          </div>
        </form>
      </Main>
    </Fragment>
  );
}

export default Signup;
