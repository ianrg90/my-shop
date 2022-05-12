import { Link } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./QuoteListItem.module.css";

function QuoteListItem(props) {
 

  return (
    <Card>
      <div className={classes.link}>
        <Link to = {`/user/quote-list/${props.id}`}>
          <li className={classes["list-item"]}>
            <div className={classes["car-info"]}>
              <h1>{props.client}</h1>
              <p>
                Car: {props.make} {props.model}
              </p>
              <p>Color: {props.color}</p>
              <p>Plates: {props.plate}</p>
            </div>
            <div className={classes.status}>
              <p>{props.date}</p>
              <p >{props.status}</p>
            </div>
          </li>
        </Link>
      </div>
    </Card>
  );
}

export default QuoteListItem;
