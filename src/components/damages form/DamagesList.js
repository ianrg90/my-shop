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
        <h3>Frente</h3>
        <div className={classes["smaller-image"]}>
          <img src={frontViewImg} alt="frontal car perspective" />
        </div>
        <div className={classes["checklist-area"]}>
          <InputRow perspective="Frente" area="Farol(esq)" />
          <InputRow perspective="Frente" area="Farol(dir)" />
          <InputRow perspective="Frente" area="Coluna(esq)" />
          <InputRow perspective="Frente" area="Coluna(dir)" />
          <InputRow perspective="Frente" area="Parachoque lado(esq)" />
          <InputRow perspective="Frente" area="Parachoque lado(dir)" />
          <InputRow perspective="Frente" area="Parachoque todo" />
          <InputRow perspective="Frente" area="Capô" />
          <InputRow perspective="Frente" area="Teto" />
        </div>
      </div>
      <div className={classes["damage-control"]}>
        <h3>Traseira</h3>
        <div className={classes["smaller-image"]}>
          <img src={backViewImg} alt="car back view perspective" />
        </div>
        <div className={classes["checklist-area"]}>
          <InputRow perspective="Traseira" area="Lanterna(esq)" />
          <InputRow perspective="Traseira" area="Lanterna(dir)" />
          <InputRow perspective="Traseira" area="Coluna(esq)" />
          <InputRow perspective="Traseira" area="Coluna(dir)" />
          <InputRow perspective="Traseira" area="Parachoque lado(esq)" />
          <InputRow perspective="Traseira" area="Parachoque lado(dir)" />
          <InputRow perspective="Traseira" area="Parachoque todo" />
          <InputRow perspective="Traseira" area="Porta malas" />
        </div>
      </div>
      <div className={classes["damage-control"]}>
        <h3>Lado esquerdo</h3>
        <div className={classes["bigger-image"]}>
          <img src={leftViewImg} alt="car left view perspective" />
        </div>
        <div className={classes["checklist-area"]}>
          <InputRow perspective="Lado esquerdo" area="Paralama(dia)" />
          <InputRow perspective="Lado esquerdo" area="Retrovisor" />
          <InputRow perspective="Lado esquerdo" area="Coluna" />
          <InputRow perspective="Lado esquerdo" area="Porta(dia)" />
          <InputRow perspective="Lado esquerdo" area="Roda(dia)" />
          <InputRow perspective="Lado esquerdo" area="Caixa de ar" />
          <InputRow perspective="Lado esquerdo" area="Porta(tras)" />
          <InputRow perspective="Lado esquerdo" area="Roda(tras)" />
          <InputRow perspective="Lado esquerdo" area="Paralama(tras)" />
        </div>
      </div>
      <div className={classes["damage-control"]}>
        <h3>Lado direito</h3>
        <div className={classes["bigger-image"]}>
          <img src={rigtViewImg} alt="car left view perspective" />
        </div>
        <div className={classes["checklist-area"]}>
          <InputRow perspective="Lado direito" area="Paralama(dia)" />
          <InputRow perspective="Lado direito" area="Retrovisor" />
          <InputRow perspective="Lado direito" area="Coluna" />
          <InputRow perspective="Lado direito" area="Porta(dia)" />
          <InputRow perspective="Lado direito" area="Roda(dia)" />
          <InputRow perspective="Lado direito" area="Caixa de ar" />
          <InputRow perspective="Lado direito" area="Porta(tras)" />
          <InputRow perspective="Lado direito" area="Roda(tras)" />
          <InputRow perspective="Lado direito" area="Paralama(tras)" />
        </div>
      </div>
    </Card>
  );
}

export default DamagesList;
