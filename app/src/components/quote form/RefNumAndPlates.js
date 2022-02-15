import { useEffect } from "react";
import useInput from "../../hooks/use-input"
import Card from "../UI/Card";
import classes from "./RefNumAndPlates.module.css"

//Generates a random refNumb between 1 and 1.000.000
const refNumb = (Math.floor(Math.random() * 1000000) + 1)

function RefNumAndPlates(props){
    
//Use the useInput hook to validate input and warn user of possible mistakes
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
    

//Every time the enteredInput changes it send the updated values to the parent component
const {onGetPlateNumAndRef} = props
    useEffect(() => {
      onGetPlateNumAndRef(enteredPlate, plateIsValid, refNumb)
  }, [enteredPlate,plateIsValid,onGetPlateNumAndRef])

    return (
        <Card>
        <div className={classes["first-row"]}>
          <div className={classes["id-control"]}>
            <h1>{refNumb}</h1>
            <p>Ref Num</p>
          </div>
          <div className={classes["plates-control"]}>
            {plateHasError && <label >Formato de placa inválida</label>}
            <input
              type="text"
              placeholder="Placa"
              onChange={handlePlate}
              onBlur={handlePlateTouch}
              maxLength="7"
            />
          </div>
        </div>
      </Card>
    )
}

export default RefNumAndPlates