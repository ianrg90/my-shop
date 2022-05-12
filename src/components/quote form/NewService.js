import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicesData } from "../../store/service-actions";
import useInput from "../../hooks/use-input";
import Button from "../UI/Button";
import classes from "./NewService.module.css";
import Card from "../UI/Card";
import { v4 as quoteId } from "uuid";

function NewService(props) {
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.services.servicesList);
  const uuid = useSelector(state => state.auth.uuid)
  const uniqueId = quoteId();
  const shortenedId = uniqueId.slice(0, 8);

  const {
    enteredValue: enteredService,
    valueIsValid: serviceIsValid,
    fieldHasError: serviceHasError,
    handleEnteredValue: handleServiceType,
    handleInputTouch: handleServiceTouch,
    reset: resetServiceType,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredPrice,
    valueIsValid: priceIsValid,
    fieldHasError: priceHasError,
    handleEnteredValue: handlePrice,
    handleInputTouch: handlePriceTouch,
    reset: resetPrice,
  } = useInput((value) => value.trim() !== "" && !isNaN(parseFloat(value)));

  function handleServiceCreation() {
    if (!serviceIsValid || !priceIsValid) {
      return;
    }
    const service = enteredService;
    const price = +enteredPrice;
    const formatedPrice = price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    props.onGetServiceAndPrice({
      id: shortenedId,
      serviceName: service,
      servicePrice: formatedPrice,
      priceInNumb: price,
    });

    resetServiceType();
    resetPrice();
  }

  //Fetch the user saved services and populate the dropdown
  useEffect(() => {
    dispatch(fetchServicesData(uuid));
  }, [dispatch, uuid]);

  const serviceOptions = serviceList.map((service) => {
    return (
      <option key={service.id} id={service.id} value={service.type}>
        {service.type}
      </option>
    );
  });

  return (
    <Card>
      <div className={classes["service-item"]}>
        <div className={classes["service-options"]}>
          {serviceHasError && <label>Invalid field</label>}
          <select
            value={enteredService}
            onChange={handleServiceType}
            onBlur={handleServiceTouch}
          >
            <option value="">Type of service</option>
            {serviceOptions}
          </select>
        </div>
        <div className={classes["service-price"]}>
          {priceHasError && <label>Invalid field</label>}
          <input
            value={enteredPrice}
            type="number"
            placeholder="Price"
            onChange={handlePrice}
            onBlur={handlePriceTouch}
          />
        </div>
      </div>
      <div className={classes["services-actions"]}>
        <Button
          text="Add"
          type="button"
          onClick={handleServiceCreation}
        />
      </div>
    </Card>
  );
}

export default NewService;
