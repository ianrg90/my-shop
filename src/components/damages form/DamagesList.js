import Card from "../UI/Card";
import classes from "./DamagesList.module.css";
import frontViewImg from "../../assets/car-front.png";
import backViewImg from "../../assets/car-back.png";
import leftViewImg from "../../assets/car-left-side.png";
import rigtViewImg from "../../assets/car-right-side.png";
import InputRow from "./InputRow";

function DamagesList() {
  return (
    <Card>
      <div className={classes["damage-control"]}>
        <h3>Front</h3>
        <div className={classes["smaller-image"]}>
          <img src={frontViewImg} alt="frontal car perspective" />
        </div>
        <div className={classes["checklist-area"]}>
          <InputRow perspective="Front" area="Left headlight" />
          <InputRow perspective="Front" area="Right headlight" />
          <InputRow perspective="Front" area="Left column" />
          <InputRow perspective="Front" area="Right column" />
          <InputRow perspective="Front" area="Bumber right side" />
          <InputRow perspective="Front" area="Bumper left side" />
          <InputRow perspective="Front" area="All bumper" />
          <InputRow perspective="Front" area="Hood" />
          <InputRow perspective="Front" area="Roof" />
        </div>
      </div>
      <div className={classes["damage-control"]}>
        <h3>Rear</h3>
        <div className={classes["smaller-image"]}>
          <img src={backViewImg} alt="car back view perspective" />
        </div>
        <div className={classes["checklist-area"]}>
          <InputRow perspective="Rear" area="Left tailight" />
          <InputRow perspective="Rear" area="Right tailight" />
          <InputRow perspective="Rear" area="Left column" />
          <InputRow perspective="Rear" area="Right column" />
          <InputRow perspective="Rear" area="Bumper left side" />
          <InputRow perspective="Rear" area="Bumper right side" />
          <InputRow perspective="Rear" area="All bumber" />
          <InputRow perspective="Rear" area="Trunk" />
        </div>
      </div>
      <div className={classes["damage-control"]}>
        <h3>Left side</h3>
        <div className={classes["bigger-image"]}>
          <img src={leftViewImg} alt="car left view perspective" />
        </div>
        <div className={classes["checklist-area"]}>
          <InputRow perspective="Left side" area="Front mud flap" />
          <InputRow perspective="Left side" area="Rear view mirror" />
          <InputRow perspective="Left side" area="Column" />
          <InputRow perspective="Left side" area="Front door" />
          <InputRow perspective="Left side" area="Front wheel" />
          <InputRow perspective="Left side" area="Air box" />
          <InputRow perspective="Left side" area="Rear door" />
          <InputRow perspective="Left side" area="Rear wheel" />
          <InputRow perspective="Left side" area="Rear mud flap" />
        </div>
      </div>
      <div className={classes["damage-control"]}>
        <h3>Right side</h3>
        <div className={classes["bigger-image"]}>
          <img src={rigtViewImg} alt="car left view perspective" />
        </div>
        <div className={classes["checklist-area"]}>
          <InputRow perspective="Right side" area="Front mud flap" />
          <InputRow perspective="Right side" area="Rear view mirror" />
          <InputRow perspective="Right side" area="Column" />
          <InputRow perspective="Right side" area="Front door" />
          <InputRow perspective="Right side" area="Front wheel" />
          <InputRow perspective="Right side" area="Air box" />
          <InputRow perspective="Right side" area="Rear door" />
          <InputRow perspective="Right side" area="Rear wheel" />
          <InputRow perspective="Right side" area="Rear mud flap" />
        </div>
      </div>
    </Card>
  );
}

export default DamagesList;
