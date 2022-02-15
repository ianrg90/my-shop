import { useSelector } from "react-redux";
import classes from "./DamagesForm.module.css";
import Card from "../UI/Card";
import DamagesLegend from "./DamagesLegend";
import DamagesList from "./DamagesList";
import Button from "../UI/Button";

function DamagesForm(props) {
  const damages = useSelector((state) => state.damageList.damages.filter(damage => damage.typeOfDamage !== ""));

  const selectedDamages = damages.map((damage) => {
    return (
      <p key={damage.id} className={classes["selected-damages"]}>
        {damage.perspective} - {damage.area}: {damage.typeOfDamage}
      </p>
    );
  });

  function submitDamageChecklist(e){
    e.preventDefault()
    if(selectedDamages.length === 0){
      return
    }
    props.onCompleteDamageForm()
  }

  return (
    <form>
      {damages.length !== 0 && <Card>{selectedDamages}</Card>}
      <DamagesLegend />
      <DamagesList />
      <Button text = "Finalizar danos" type = "submit" onClick = {submitDamageChecklist}/>
    </form>
  );
}

export default DamagesForm;
