import { useEffect } from "react";
import useInput from "../../hooks/use-input";
import Card from "../UI/Card";
import classes from "./VehicleModelAndColor.module.css";

function VehicleModelAndColor(props) {
  //Use the useInput hook to validate the input fields and warn the user of mistakes
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
  } = useInput((value) => value.trim() !== "" && !isNaN(parseFloat(value)));

  const { onGetVehicleInfo } = props;

//If any of the values is invalid prevent the form to be submited on the parent component
  const infoIsValid = makeIsValid && modelIsValid && colorIsValid && yearIsValid;

  useEffect(() => {
    onGetVehicleInfo(enteredMake,enteredModel,enteredColor,enteredYear,infoIsValid);
  }, [onGetVehicleInfo, enteredMake, enteredModel, enteredColor, enteredYear, infoIsValid]);

  return (
    <Card>
      <div className={classes["vehicle-model"]}>
        
          {makeHasError && <label >Por favor preencha o campo abaixo</label>}
          <input
            type="text"
            placeholder="Marca"
            onChange={handleMake}
            onBlur={handleMakeTouch}
          />
        
          {modelHasError && <label>Por favor preencha o campo abaixo</label>}
          <input
            type="text"
            placeholder="Modelo"
            onChange={handleModel}
            onBlur={handleModelTouch}
          />
        
          {colorHasError && <label>Por favor preencha o campo abaixo</label>}
          <input
            type="text"
            placeholder="Cor"
            onChange={handleColor}
            onBlur={handleColorTouch}
          />
        
          {yearHasError && <label>Por favor preencha o campo abaixo</label>}
          <input
            type="number"
            placeholder="Ano"
            onChange={handleYear}
            onBlur={handleYearTouch}
          />
        
      </div>
    </Card>
  );
}

export default VehicleModelAndColor;
