import Card from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { deleteServiceData } from "../../store/service-actions";
import classes from "./ServicesList.module.css";
import Button from "../UI/Button";

function ServicesList(props) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { uuid, token } = authState;

  function deleteService(id) {
    dispatch(deleteServiceData(id, uuid, token));
    props.onControlStatus();
  }

  const services = props.services.map((service) => {
    return (
      <li key={service.id}>
        <p>{service.type}</p>
        <Button text="Delete" onClick={deleteService.bind(null, service.id)} />
      </li>
    );
  });

  return (
    <ul className={classes["services-list"]}>
      <Card>{services}</Card>
    </ul>
  );
}

export default ServicesList;
