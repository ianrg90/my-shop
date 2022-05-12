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
          <p>Vehicle type</p>
          <div className={classes["vehicle-type-list"]}>
            <div className={classes["vehicle-type-item"]}>
              <input
                type="radio"
                id="small"
                name="type"
                value="small"
                onChange={handleType}
              />
              <label htmlFor="small">Small</label>
            </div>
            <div className={classes["vehicle-type-item"]}>
              <input
                type="radio"
                id="medium"
                name="type"
                value="medium"
                onChange={handleType}
              />
              <label htmlFor="medium">Medium</label>
            </div>
            <div className={classes["vehicle-type-item"]}>
              <input
                type="radio"
                id="large"
                name="type"
                value="Large"
                onChange={handleType}
              />
              <label htmlFor="large">Large</label>
            </div>
            <div className={classes["vehicle-type-item"]}>
              <input
                type="radio"
                id="bike"
                name="type"
                value="bike"
                onChange={handleType}
              />
              <label htmlFor="bike">Bike</label>
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