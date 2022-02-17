import { useReducer, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { damageActions } from "../../store/damages-slice";
import classes from "./InputRow.module.css";
import {v4 as damageId} from "uuid"

//Manages the damage object
const damagesReducer = (state, action) => {
  if (action.type === "ADD_DAMAGE") {
    return { ...state, typeOfDamage: state.typeOfDamage + action.val , id: action.id};
  }
  if (action.type === "DELETE_DAMAGE") {
    const uncheckedValue = action.val;
    const updateDamages = state.typeOfDamage.split("");
    const removeDamage = updateDamages
      .filter((val) => val !== uncheckedValue)
      .join("");
    return { ...state, typeOfDamage: removeDamage };
  }
};

function InputRow(props) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirsLoad] = useState(true);
  const [damageState, dispatchDamageState] = useReducer(damagesReducer, {
    id: "",
    perspective: props.perspective,
    area: props.area,
    typeOfDamage: "",
  });
//Generates a random id
  const id = damageId().slice(0,8)
//Dispatch the actions to be performed in the damageReducer
  function handleDamageInput(e) {
    setIsFirsLoad(false);
    if (e.target.checked) {
      dispatchDamageState({ type: "ADD_DAMAGE", val: e.target.value, id: id });
    } else {
      dispatchDamageState({ type: "DELETE_DAMAGE", val: e.target.value });
    }
  }
//Watch the damage obj and fire the function in the redux store for each change 
  useEffect(() => {
    if (isFirstLoad) {
      return;
    } else {
      dispatch(damageActions.getDamages(damageState));
    }
  }, [dispatch, damageState, isFirstLoad]);

  return (
    <div className={classes["checklist-item"]}>
      <div>
        <p>{props.area}</p>
      </div>
      <div className={classes["checklist-inputs"]}>
        <div>
          <input id={props.perspective + props.area + "lanternagem"} type="checkbox" value="L" onChange={handleDamageInput} />
          <label htmlFor={props.perspective + props.area + "lanternagem"}>L</label>
        </div>
        <div>
          <input id={props.perspective + props.area + "pintura"} type="checkbox" value="P" onChange={handleDamageInput} />
          <label htmlFor={props.perspective + props.area + "pintura"}>P</label>
        </div>
        <div>
          <input id={props.perspective + props.area + "troca"} type="checkbox" value="T" onChange={handleDamageInput} />
          <label htmlFor={props.perspective + props.area + "troca"}>T</label>
        </div>
      </div>
    </div>
  );
}

export default InputRow;
