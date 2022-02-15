import Card from "../UI/Card";
import classes from "./DamagesLegend.module.css";

function DamagesLegend() {
  return (
    <Card>
      <div className={classes.legend}>
        <p>A - Amassado</p>
        <p>R - Riscado</p>
        <p>T - Troca</p>
      </div>
    </Card>
  );
}

export default DamagesLegend;
