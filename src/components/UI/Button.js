import classes from "./Button.module.css"

function Button(props) {
  return (
    <div className= {classes.container}>
      <button  type={props.type} onClick={props.onClick} data-id = {props["data-id"]}>
        {props.text}
      </button>
    </div>
  );
}

export default Button;
