import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./NewQuoteForm.module.css";
import Button from "../UI/Button";
import ClientInfo from "./ClientInfo";
import VehicleType from "./VehicleType";
import VehicleInfo from "./VehicleInfo";
import ServiceList from "./ServiceList";
import NewService from "./NewService";
import ObservationsAndParts from "./ObservationsAndParts";
import { postQuoteData } from "../../store/quote-actions";


function NewQuoteForm() {
  const [enteredClientInfo, setEnteredClientInfo] = useState({});
  const [enteredType, setEnteredType] = useState("");
  const [enteredVehicleInfo, setEnteredVehicleInfo] = useState({});
  const [serviceAndPriceList, setServiceAndPriceList] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [obs, setObs] = useState("");
  const [parts, setParts] = useState("");

  const dispatch = useDispatch();
  const damages = useSelector((state) =>
    state.damageList.damages.filter((damage) => damage.typeOfDamage !== "")
  );
  const navigate = useNavigate();


  const getClientInfo = useCallback(
    (name, phone, cpf, isNameValid, isPhoneValid) => {
      setEnteredClientInfo((prevState) => {
        return { ...prevState, name, phone, cpf, isNameValid, isPhoneValid };
      });
    },
    []
  );

  const getVehicleType = useCallback((type) => {
    setEnteredType(type);
  }, []);

  const getVehicleInfo = useCallback(
    (plate, make, model, color, year, deliveryDate, infoIsValid) => {
      setEnteredVehicleInfo((prevState) => {
        return {
          ...prevState,
          plate,
          make,
          model,
          color,
          year,
          deliveryDate,
          infoIsValid,
        };
      });
    },
    []
  );

  function getServiceAndPrice(obj) {
    setServiceAndPriceList((prevState) => {
      return [...prevState, obj];
    });
  }

  const getTotalPrice = useCallback((value) => {
    setTotalPrice(value);
  }, []);

  const getObsAndParts = useCallback((obs, parts) => {
    setObs(obs);
    setParts(parts);
  }, []);

  //Handle list state to add or remove services
  function deleteServiceItem(id) {
    setServiceAndPriceList((prevState) => {
      return prevState.filter((service) => service.id !== id);
    });
  }

  //Handle form submition
  function submitQuote(e) {
    e.preventDefault();

    if (
      !enteredClientInfo.isNameValid ||
      !enteredClientInfo.isPhoneValid ||
      !enteredVehicleInfo.infoIsValid ||
      serviceAndPriceList.length === 0
    ) {
      return;
    }

    const formatedEnteringDate = new Date().toLocaleDateString("pt-BR");
    const completeDeliveryDate = new Date(enteredVehicleInfo.deliveryDate);
    const formatedDeliveryDate = completeDeliveryDate.toLocaleDateString("pt-BR");
    

    const quoteData = {
      date: formatedEnteringDate,
      formatedDeliveryDate,
      plate: enteredVehicleInfo.plate,
      clientName: enteredClientInfo.name,
      phone: enteredClientInfo.phone,
      CPF: enteredClientInfo.cpf,
      carType: enteredType,
      make: enteredVehicleInfo.make,
      model: enteredVehicleInfo.model,
      color: enteredVehicleInfo.color,
      year: enteredVehicleInfo.year,
      services: serviceAndPriceList,
      total: totalPrice,
      damages,
      obs,
      parts,
      status: "pendente",
    };

    //use the quote action function to post on backend
    dispatch(postQuoteData(quoteData));

    navigate("/user", { replace: true });
  }

  return (
    <form className={classes["form-control"]} id="quote-form">
      <ClientInfo onGetClientInfo={getClientInfo} />
      <VehicleType onGetVehicleType={getVehicleType} />
      <VehicleInfo onGetVehicleInfo={getVehicleInfo} />
      {serviceAndPriceList.length > 0 && (
        <ServiceList
          list={serviceAndPriceList}
          onGetTotalPrice={getTotalPrice}
          onDeleteServiceItem={deleteServiceItem}
        />
      )}
      <NewService onGetServiceAndPrice={getServiceAndPrice} />
      <ObservationsAndParts onGetObsAndParts={getObsAndParts} />
      <Button text="Finalizar orçamento" type="submit" onClick={submitQuote} />
    </form>
  );
}

export default NewQuoteForm;
