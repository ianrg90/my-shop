import Card from "./Card";
import Button from "./Button";
import classes from "./ConfirmationPage.module.css";

function ConfirmationPage(props) {
  return (
    <Card>
      <div className={classes["confirmation-container"]}>
        <h1>Tem certeza que deseja apagar o orçamento?</h1>
        <div className={classes.actions}>
          <Button text="Sim" onClick={props.onDeleteQuote} />
          <Button text="Cancelar" onClick={props.onOpenDeleteModal} />
        </div>
      </div>
    </Card>
  );
}

export default ConfirmationPage;
