import Card from "../UI/Card";
import classes from "./DamagesLegend.module.css";

function DamagesLegend() {
  return (
    <Card>
      <div className={classes.legend}>
        <p>W- Auto Body Work</p>
        <p>P - Painting</p>
        <p>R - Replace</p>
      </div>
    </Card>
  );
}

export default DamagesLegend;
