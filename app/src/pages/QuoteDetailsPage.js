import { Fragment, useState, useEffect, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useScreenshot, createFileName } from "use-react-screenshot";
import Header from "../components/layout/header/Header";
import Main from "../components/layout/main/Main";
import Card from "../components/UI/Card";
import classes from "./QuoteDetailsPage.module.css";
import Button from "../components/UI/Button";
import { deleteQuoteData, updateStatusData } from "../store/quote-actions";
import { formatPlate, formatPhone, formatCPF } from "../utils/FormatDataUtils";
import ConfirmationPage from "../components/UI/ConfirmationPage";

function QuoteDetailsPage() {
  const screenShotRef = createRef(null);
  const [image, takeScreenShot] = useScreenshot();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentQuote, setCurrentQuote] = useState([]);
  const quote = useSelector((state) => state.quotes.quoteList);
  const uuid = useSelector(state => state.auth.uuid)
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
  }, [quote, quoteID]);

  let services;
  let damages;
  let plate;
  let phone;
  let cpf;

  //Map the data only after the list is received from the server
  if (currentQuote.services) {
    services = currentQuote.services.map((service) => {
      return (
        <div key={service.id} className={classes["service-quote"]}>
          <h1 className={classes["service-name"]}>{service.serviceName}</h1>
          <h1>-{service.servicePrice}</h1>
        </div>
      );
    });

    plate = formatPlate(currentQuote.plate);
    phone = formatPhone(currentQuote.phone);
    cpf = formatCPF(currentQuote.CPF);
  }

  if (currentQuote.damages)
    damages = currentQuote.damages.map((damage) => {
      return (
        <div key={damage.id}>
          <p>
            {damage.perspective}: {damage.area} - {damage.typeOfDamage}
          </p>
        </div>
      );
    });

  //update status
  function handleStatus(e) {
    if (e.target.value === "") {
      return;
    }
    dispatch(updateStatusData(quoteID, uuid ,e.target.value));
    navigate("/user", { replace: true });
  }

  //open delete confirmation modal
  function openDeleteModal() {
    setShowConfirm((prevState) => {
      return !prevState;
    });
  }

  //delete quote
  function deleteQuote() {
    dispatch(deleteQuoteData(quoteID, uuid));
    navigate("/user", { replace: true });
  }

  //download screenshot
  function download(image, name, extension) {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  }
  //take screenshot of a determined screen node
  function getScreenShot() {
    takeScreenShot(screenShotRef.current);
  }

  useEffect(() => {
    if (image) {
      download(image, currentQuote.clientName, "png");
    }
  }, [image, currentQuote]);

  return (
    <Fragment>
      <Header text="Detalhes do orçamento" />
      <Main>
        {!showConfirm && (
          <div>
            <div ref={screenShotRef}>
              <Card>
                <div className={classes.header}>
                  <h1 className={classes.logo}>Black Shed</h1>
                  <h1 className={classes.date}>{currentQuote.date}</h1>
                </div>
              </Card>
              <Card>
                <div className={classes["client-info"]}>
                  <div className={classes["info-block"]}>
                    <p className={classes["tags"]}>Nome do cliente:</p>
                    <p>{currentQuote.clientName}</p>
                  </div>
                  <div className={classes["info-block"]}>
                    <p className={classes["tags"]}>Contato:</p>
                    <p>{phone}</p>
                  </div>
                  <div className={classes["info-block"]}>
                    <p className={classes["tags"]}>CPF/CNPJ:</p>
                    <p>{cpf}</p>
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
                    <p className={classes["tags"]}>Placa:</p>
                    <p className={classes.uppercase}>{plate}</p>
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
                  <p className={classes["tags"]}>
                    Data prevista para entrega:{" "}
                  </p>
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
            </div>
            {currentQuote.obs !== "" && (
              <Card>
                <p className={classes.obs}>Obs: </p>
                <span className={classes.description}>{currentQuote.obs}</span>
              </Card>
            )}
            {currentQuote.parts !== "" && (
              <Card>
                <p className={classes.obs}>Peças: </p>
                <span className={classes.description}>
                  {currentQuote.parts}
                </span>
              </Card>
            )}

            <div className={classes.status}>
              <label htmlFor="status">Status: </label>
              <select
                name="status"
                onBlur={handleStatus}
              >
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
              <div className={classes["button-container"]}>
                <Button text="Enviar" onClick={getScreenShot} />
              </div>
              <div>
                <Button text="Apagar orçamento" onClick={openDeleteModal} />
              </div>
            </div>
          </div>
        )}
        {showConfirm && (
          <ConfirmationPage
            onOpenDeleteModal={openDeleteModal}
            onDeleteQuote={deleteQuote}
          />
        )}
      </Main>
    </Fragment>
  );
}

export default QuoteDetailsPage;
