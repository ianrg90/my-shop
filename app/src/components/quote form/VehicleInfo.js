import { Fragment, useEffect } from "react";
import useInput from "../../hooks/use-input";
import Card from "../UI/Card";
import classes from "./VehicleInfo.module.css";

function VehicleInfo(props) {
  //Use the useInput hook to validate the input fields and warn the user of mistakes
  const {
    enteredValue: enteredPlate,
    valueIsValid: plateIsValid,
    fieldHasError: plateHasError,
    handleEnteredValue: handlePlate,
    handleInputTouch: handlePlateTouch,
  } = useInput(
    (value) =>
    /^[A-Z]{3}[0-9]{4}$/gi.test(value.trim()) ||
    /^[A-Z]{3}[\d]{1}[A-Z]{1}[\d]{2}/gi.test(value.trim())
  );
  
  const {
    enteredValue: enteredMake,
    valueIsValid: makeIsValid,
    fieldHasError: makeHasError,
    handleEnteredValue: handleMake,
    handleInputTouch: handleMakeTouch,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredModel,
    valueIsValid: modelIsValid,
    fieldHasError: modelHasError,
    handleEnteredValue: handleModel,
    handleInputTouch: handleModelTouch,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredColor,
    valueIsValid: colorIsValid,
    fieldHasError: colorHasError,
    handleEnteredValue: handleColor,
    handleInputTouch: handleColorTouch,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredYear,
    valueIsValid: yearIsValid,
    fieldHasError: yearHasError,
    handleEnteredValue: handleYear,
    handleInputTouch: handleYearTouch,
  } = useInput(
    (value) =>
      value.trim() !== "" &&
      !isNaN(parseFloat(value)) &&
      value.trim().length === 4
  );

  const {
    enteredValue: enteredDate,
    valueIsValid: dateIsValid,
    fieldHasError: dateHasError,
    handleEnteredValue: handleDate,
    handleInputTouch: handleDateTouch,
  } = useInput((value) => value.trim() !== "");

  const { onGetVehicleInfo } = props;

  //If any of the values is invalid prevent the form to be submited on the parent component
  const infoIsValid =
   plateIsValid && makeIsValid && modelIsValid && colorIsValid && yearIsValid && dateIsValid;

  useEffect(() => {
    onGetVehicleInfo(
      enteredPlate,
      enteredMake,
      enteredModel,
      enteredColor,
      enteredYear,
      enteredDate,
      infoIsValid
    );
  }, [
    onGetVehicleInfo,
    enteredPlate,
    enteredMake,
    enteredModel,
    enteredColor,
    enteredYear,
    enteredDate,
    infoIsValid,
  ]);

  return (
    <Fragment>
      <Card>
        <div className={classes["vehicle-model"]}>
          {plateHasError && <label>Formato de placa inválida</label>}
          <input className={classes["plates-input"]}
            type="text"
            placeholder="Placa"
            onChange={handlePlate}
            onBlur={handlePlateTouch}
            maxLength="7"
          />
          {makeHasError && <label>Campo inválido</label>}
          <input
            type="text"
            placeholder="Marca"
            onChange={handleMake}
            onBlur={handleMakeTouch}
          />

          {modelHasError && <label>Campo inválido</label>}
          <input
            type="text"
            placeholder="Modelo"
            onChange={handleModel}
            onBlur={handleModelTouch}
          />

          {colorHasError && <label>Campo inválido</label>}
          <input
            type="text"
            placeholder="Cor"
            onChange={handleColor}
            onBlur={handleColorTouch}
          />

          {yearHasError && <label>Campo inválido</label>}
          <input
            type="number"
            placeholder="Ano"
            onChange={handleYear}
            onBlur={handleYearTouch}
          />
        </div>
      </Card>
      <Card>
        <div className={classes["vehicle-model"]}>
          {dateHasError && <label>Campo inválido</label>}
          <input
            type="text"
            placeholder="Data prevista para entrega"
            required
            onFocus={(e) => (e.target.type = "date")}
            onChange={handleDate}
            onBlur={handleDateTouch}
          />
        </div>
      </Card>
    </Fragment>
  );
}

export default VehicleInfo;
