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
        {clientHasError && <label>Favor preencha o campo abixo</label>}
        <input
          type="text"
          placeholder="Nome do cliente"
          onChange={handleClientName}
          onBlur={handleClientTouch}
        />
        {phoneHasError && <label>Número de telefone inválido</label>}
        <input
          type="text"
          placeholder="Contato"
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
