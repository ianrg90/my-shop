import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/header/Header";
import Main from "../components/layout/main/Main";
import Card from "../components/UI/Card";
import classes from "./QuoteDetailsPage.module.css";
import Button from "../components/UI/Button";
import { deleteQuoteData, updateStatusData } from "../store/quote-actions";

function QuoteDetailsPage() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [currentQuote, setCurrentQuote] = useState([]);
  const quote = useSelector((state) => state.quotes.quoteList);
  const params = useParams();
  const quoteID = params.quoteID;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Need to find a way of just load the page when the currenquote is ready
  useEffect(() => {
    for (const key in quote) {
      if (key === quoteID) {
        setCurrentQuote(quote[key]);
      }
    }
    setIsEmpty(false);
  }, [quote, quoteID]);

  let services;
  let damages;

  if (!isEmpty) {
    services = currentQuote.services.map((service) => {
      return (
        <div key={service.id} className={classes["service-quote"]}>
          <h1 className={classes["service-name"]}>{service.serviceName}</h1>
          <h1>-{service.servicePrice}</h1>
        </div>
      );
    });
  }

  if (!isEmpty && currentQuote.damages) {
    damages = currentQuote.damages.map((damage) => {
      return (
        <div key={damage.id}>
          <p>
            {damage.perspective}: {damage.area} - {damage.typeOfDamage}
          </p>
        </div>
      );
    });
  }

  function handleStatus(e) {
    if (e.target.value === "") {
      return;
    }
    dispatch(updateStatusData(quoteID, e.target.value));
    navigate("/user", { replace: true });
  }

  function deleteQuote() {
    dispatch(deleteQuoteData(quoteID));
    navigate("/user", { replace: true });
  }

  return (
    <Fragment>
      <Header text="Detalhes do orçamento" />
      <Main>
        <Card>
          <div className={classes["quote-header"]}>
            <div className={classes["id-control"]}>
              <h1>{currentQuote.refNumb}</h1>
              <p>Ref Num</p>
            </div>
            <div className={classes["plates-control"]}>
              <h1>Placa: {currentQuote.plate}</h1>
            </div>
          </div>
        </Card>
        <Card>
          <div className={classes["client-info"]}>
            <div className={classes["info-block"]}>
              <p className={classes["tags"]}>Nome do cliente:</p>
              <p>{currentQuote.clientName}</p>
            </div>
            <div className={classes["info-block"]}>
              <p className={classes["tags"]}>Celular:</p>
              <p>{currentQuote.phone}</p>
            </div>
            <div className={classes["info-block"]}>
              <p className={classes["tags"]}>CPF/CNPJ:</p>
              <p>{currentQuote.CPF}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className={classes["car-info"]}>
            <div className={classes["info-block"]}>
              <p className={classes["tags"]}>Porte do veículo:</p>
              <p>{currentQuote.carType}</p>
            </div>
            <div className={classes["info-block"]}>
              <p className={classes["tags"]}>Marca:</p>
              <p>{currentQuote.make}</p>
            </div>
            <div className={classes["info-block"]}>
              <p className={classes["tags"]}>Modelo:</p>
              <p>{currentQuote.model}</p>
            </div>
            <div className={classes["info-block"]}>
              <p className={classes["tags"]}>Cor:</p>
              <p>{currentQuote.color}</p>
            </div>
            <div className={classes["info-block"]}>
              <p className={classes["tags"]}>Ano:</p>
              <p>{currentQuote.year}</p>
            </div>
          </div>
        </Card>
        <Card>
            <div className={classes["info-block"]}>
              <p className={classes["tags"]} >Data prevista para entrega: </p>
              <p>{currentQuote.formatedDeliveryDate}</p>
            </div>
        </Card>
        {damages && (
          <Card>
            <h1>Relatório de danos</h1>
            {damages}
          </Card>
        )}
        <Card>
          <h1>Serviços:</h1>
          <hr />
          {services}
          <hr />
          <h1 className={classes.total}>Total: {currentQuote.total}</h1>
        </Card>
        {currentQuote.obs !== "" && (
          <Card>
            <p className={classes.obs}>Obs: </p>
            <span className={classes.description}>{currentQuote.obs}</span>
          </Card>
        )}
        {currentQuote.parts !== "" && (
          <Card>
            <p className={classes.obs}>Peças: </p>
            <span className={classes.description}>{currentQuote.parts}</span>
          </Card>
        )}
        <div className={classes.status}>
          <label htmlFor="status">Status: </label>
          <select name="status" defaultValue="pendente" onChange={handleStatus}>
            <option value="pendente">Pendente</option>
            <option value="aprovado">Aprovado</option>
            <option value="lanternagem">Lanternagem</option>
            <option value="preparação">Preparação</option>
            <option value="pintura">Pintura</option>
            <option value="polimento">Polimento</option>
            <option value="pronto">Pronto</option>
          </select>
        </div>
        <div className={classes.actions}>
          <Button text="Apagar orçamento" onClick={deleteQuote} />
        </div>
      </Main>
    </Fragment>
  );
}

export default QuoteDetailsPage;
