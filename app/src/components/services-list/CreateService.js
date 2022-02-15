import { useDispatch } from "react-redux"; 
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./CreateService.module.css";
import useInput from "../../hooks/use-input";
import { postServiceData } from "../../store/service-actions";

function CreateService(props) {
  const dispatch = useDispatch();

  const {
    enteredValue: enteredService,
    valueIsValid: serviceIsValid,
    fieldHasError: serviceHasError,
    handleEnteredValue: handleEnteredService,
    handleInputTouch: handleServiceTouch,
    reset: resetService,
  } = useInput((value) => value.trim() !== "");

  function handleServiceCreation(e) {
    e.preventDefault();
    if (!serviceIsValid) {
      return;
    }

    const service = enteredService;
    dispatch(postServiceData(service));
    props.onControlStatus()
    
    resetService();
  }

  return (
    <Card>
      <form className={classes.services} onSubmit={handleServiceCreation}>
        <div>
          {serviceHasError && <label>Favor preencher o campo abaixo!</label>}
          <input
            value={enteredService}
            type="text"
            placeholder="Nome do serviço"
            onChange={handleEnteredService}
            onBlur={handleServiceTouch}
          />
        </div>
        <div className={classes.actions}>
          <Button text="Criar" />
        </div>
      </form>
    </Card>
  );
}

export default CreateService;
