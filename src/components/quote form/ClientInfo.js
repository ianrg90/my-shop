import { useEffect } from "react";
import useInput from "../../hooks/use-input";
import classes from "./ClientInfo.module.css";
import Card from "../UI/Card";

function ClientInfo(props) {

//Use the useInput hook to validate input fields and warn the user of mistakes
  const {
    enteredValue: enteredClient,
    valueIsValid: clientIsValid,
    fieldHasError: clientHasError,
    handleEnteredValue: handleClientName,
    handleInputTouch: handleClientTouch,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredPhone,
    valueIsValid: phoneIsValid,
    fieldHasError: phoneHasError,
    handleEnteredValue: handlePhone,
    handleInputTouch: handlePhoneTouch,
  } = useInput((value) => {
    if(value.trim().length === 11 && (/^[1-9]{2}[9][\d]{8}/gi.test(value.trim()))){
      return true
    }

    else if(value.trim().length === 10 && (/^[1-9]{2}[2-3]/gi.test(value.trim()))){
      return true
    }
    else{
      return false
    }    
  });

  const { enteredValue: enteredCPF, handleEnteredValue: handleCPF } = useInput(
    (value) => value.trim() !== "");

  const { onGetClientInfo } = props;
  useEffect(() => {
    onGetClientInfo(
      enteredClient,
      enteredPhone,
      enteredCPF,
      clientIsValid,
      phoneIsValid
    );
  }, [onGetClientInfo, enteredClient, enteredPhone, enteredCPF, clientIsValid, phoneIsValid]);

  return (
    <Card>
      <div className={classes["client-info"]}>
        {clientHasError && <label>Field can't be blank</label>}
        <input
          type="text"
          placeholder="Client name"
          onChange={handleClientName}
          onBlur={handleClientTouch}
        />
        {phoneHasError && <label>Invalid phone number</label>}
        <input
          type="text"
          placeholder="Phone"
          maxLength={11}
          onChange={handlePhone}
          onBlur={handlePhoneTouch}
        />
        <input
          type="text"
          placeholder="CPF/CNPJ"
          maxLength="14"
          onChange={handleCPF}
        />
      </div>
    </Card>
  );
}

export default ClientInfo;
