import { useEffect } from "react";
import classes from "./ServiceList.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";

function ServiceList(props) {
  const list = props.list;
  const totalPrice = list.reduce((totalSum, item) => {
    return (totalSum = totalSum + item.priceInNumb);
  }, 0);

  const formatedTotalPrice = totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const servicesList = (
    <ul className={classes["services-list"]}>
      {list.map((service) => {
        return (
          <li key={service.id}>
            <h1>{service.serviceName}</h1>
            <p>{service.servicePrice}</p>
            <Button
              type="button"
              text="Delete"
              onClick={deleteItem}
              data-id={service.id}
            />
          </li>
        );
      })}
    </ul>
  );

  function deleteItem(e) {
    const itemId = e.target.dataset.id;
    props.onDeleteServiceItem(itemId);
  }

  const { onGetTotalPrice } = props;
  useEffect(() => {
    onGetTotalPrice(formatedTotalPrice);
  }, [onGetTotalPrice, formatedTotalPrice]);

  return (
    <Card>
      {servicesList}
      <h1 className={classes.total}>Total: {formatedTotalPrice}</h1>
    </Card>
  );
}

export default ServiceList;
