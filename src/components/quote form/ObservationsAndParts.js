import { Fragment, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./ObservationsAndParts.module.css";
import useInput from "../../hooks/use-input";

function ObservationsAndParts(props) {
  const { enteredValue: enteredObs, handleEnteredValue: handleObs } = useInput(
    (value) => value.trim() !== "");

  const { enteredValue: enteredParts, handleEnteredValue: handleParts } =
    useInput((value) => value.trim() !== "");

  const { onGetObsAndParts } = props;
  useEffect(() => {
    onGetObsAndParts(enteredObs, enteredParts)
  }, [onGetObsAndParts, enteredObs, enteredParts]);

  return (
    <Fragment>
      <Card>
        <div className={classes.observations}>
          <label htmlFor="obs">Obs:</label>
          <textarea
            name="obs"
            form="quote-form"
            rows={4}
            placeholder="Observations ..."
            onChange={handleObs}
          ></textarea>
        </div>
      </Card>
      <Card>
        <div className={classes.observations}>
          <label htmlFor="parts">Parts to replace:</label>
          <textarea
            name="parts"
            form="quote-form"
            rows={4}
            placeholder="Parts to replace ..."
            onChange={handleParts}
          ></textarea>
        </div>
      </Card>
    </Fragment>
  );
}

export default ObservationsAndParts;
