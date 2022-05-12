import Card from "./Card";
import Button from "./Button";
import classes from "./ConfirmationPage.module.css";

function ConfirmationPage(props) {
  return (
    <Card>
      <div className={classes["confirmation-container"]}>
        <h1>Are you sure you want to erase this quote ?</h1>
        <div className={classes.actions}>
          <Button text="Yes" onClick={props.onDeleteQuote} />
          <Button text="Cancel" onClick={props.onOpenDeleteModal} />
        </div>
      </div>
    </Card>
  );
}

export default ConfirmationPage;
