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
import DamagesLegend from "../components/damages form/DamagesLegend";

function QuoteDetailsPage() {
  const screenShotRef = createRef(null);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [image, takeScreenShot] = useScreenshot();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentQuote, setCurrentQuote] = useState([]);
  const quote = useSelector((state) => state.quotes.quoteList);
  const authState = useSelector(state => state.auth)
  const {uuid, token} = authState
  const params = useParams();
  const quoteID = params.quoteID;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const number = "55" + currentQuote.phone;

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
    dispatch(updateStatusData(quoteID, uuid, e.target.value, token));
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
    dispatch(deleteQuoteData(quoteID, uuid, token));
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
      setIsDownloaded(true);
    }
  }, [image, currentQuote]);

  //Alow the image to be downloaded before redirecting to whatsapp chat
  useEffect(() => {
    if (isDownloaded) {
      const whatsapp = document.createElement("a");
      whatsapp.href = `https://wa.me/${number}`;
      whatsapp.target = "_blank"
      whatsapp.click();
    }
  }, [isDownloaded, number]);

  return (
    <Fragment>
      <Header text="Quote detail sheet" />
      <Main>
        {!showConfirm && (
          <div>
            <div ref={screenShotRef}>
              <Card>
                <div className={classes.header}>
                  <h1 className={classes.logo}>My Shop</h1>
                  <h1 className={classes.date}>{currentQuote.date}</h1>
                </div>
              </Card>
              <Card>
                <div className={classes["client-info"]}>
                  <div className={classes["info-block"]}>
                    <p className={classes["tags"]}>Client name:</p>
                    <p>{currentQuote.clientName}</p>
                  </div>
                  <div className={classes["info-block"]}>
                    <p className={classes["tags"]}>Phone:</p>
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
                    <p className={classes["tags"]}>Vehicle type:</p>
                    <p>{currentQuote.carType}</p>
                  </div>
                  <div className={classes["info-block"]}>
                    <p className={classes["tags"]}>Brand:</p>
                    <p>{currentQuote.make}</p>
                  </div>
                  <div className={classes["info-block"]}>
                    <p className={classes["tags"]}>Model:</p>
                    <p>{currentQuote.model}</p>
                  </div>
                  <div className={classes["info-block"]}>
                    <p className={classes["tags"]}>Plates:</p>
                    <p className={classes.uppercase}>{plate}</p>
                  </div>
                  <div className={classes["info-block"]}>
                    <p className={classes["tags"]}>Color:</p>
                    <p>{currentQuote.color}</p>
                  </div>
                  <div className={classes["info-block"]}>
                    <p className={classes["tags"]}>Year:</p>
                    <p>{currentQuote.year}</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className={classes["info-block"]}>
                  <p className={classes["tags"]}>
                   Delivery date:{" "}
                  </p>
                  <p>{currentQuote.formatedDeliveryDate}</p>
                </div>
              </Card>
              {damages && (
                <Card>
                  <DamagesLegend />
                  <h1>Damages report</h1>
                  {damages}
                </Card>
              )}
              <Card>
                <h1>Services:</h1>
                <hr />
                {services}
                <hr />
                <h1 className={classes.total}>Total: {currentQuote.total}</h1>
              </Card>

              {currentQuote.obs !== "" && (
                <Card>
                  <div className={classes.obs}>
                    <p>Obs: </p>
                    <span>{currentQuote.obs}</span>
                  </div>
                </Card>
              )}
              {currentQuote.parts !== "" && (
                <Card>
                  <div className={classes.obs}>
                    <p>Peças: </p>
                    <span>{currentQuote.parts}</span>
                  </div>
                </Card>
              )}
            </div>
            <div className={classes.status}>
              <label htmlFor="status">Status: </label>
              <select name="status" onBlur={handleStatus}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="body work">Body work</option>
                <option value="preparation">Preparation</option>
                <option value="painting">Painting</option>
                <option value="polishing">Polishing</option>
                <option value="Finished">Finished</option>
              </select>
            </div>
            <div className={classes.actions}>
              <div className={classes["button-container"]}>
                <Button text="Send to client" onClick={getScreenShot} />
              </div>
              <div>
                <Button text="Erase quote" onClick={openDeleteModal} />
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
