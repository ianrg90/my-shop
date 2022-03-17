import { useEffect } from "react";
import classes from "./VehicleType.module.css"
import useInput from "../../hooks/use-input"
import Card from "../UI/Card";

function VehicleType(props){

    const { enteredValue: enteredType, handleEnteredValue: handleType } =
    useInput((value) => value.trim() !== "");

    const {onGetVehicleType} = props

    useEffect(() => {
        onGetVehicleType(enteredType)
    }, [onGetVehicleType, enteredType])

    return (
        <Card>
        <div className={classes["vehicle-type"]}>
          <p>Porte do veículo</p>
          <div className={classes["vehicle-type-list"]}>
            <div className={classes["vehicle-type-item"]}>
              <input
                type="radio"
                id="small"
                name="type"
                value="pequeno"
                onChange={handleType}
              />
              <label htmlFor="small">Pequeno</label>
            </div>
            <div className={classes["vehicle-type-item"]}>
              <input
                type="radio"
                id="medium"
                name="type"
                value="médio"
                onChange={handleType}
              />
              <label htmlFor="medium">Médio</label>
            </div>
            <div className={classes["vehicle-type-item"]}>
              <input
                type="radio"
                id="large"
                name="type"
                value="grande"
                onChange={handleType}
              />
              <label htmlFor="large">Grande</label>
            </div>
            <div className={classes["vehicle-type-item"]}>
              <input
                type="radio"
                id="bike"
                name="type"
                value="moto"
                onChange={handleType}
              />
              <label htmlFor="bike">Moto</label>
            </div>
            <div className={classes["vehicle-type-item"]}>
              <input
                type="radio"
                id="pickup"
                name="type"
                value="pickup"
                onChange={handleType}
              />
              <label htmlFor="pickup">Pickup</label>
            </div>
          </div>
        </div>
      </Card>
    )

}

export default VehicleType