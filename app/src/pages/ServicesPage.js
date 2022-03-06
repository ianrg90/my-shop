import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/layout/header/Header";
import Main from "../components/layout/main/Main";
import CreateService from "../components/services-list/CreateService";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Error from "../components/UI/Error";
import ServicesList from "../components/services-list/ServicesList";
import { fetchServicesData } from "../store/service-actions";

function ServicesPage() {
  const [serviceCreated, setServiceCreated] = useState(false);
  const servicesList = useSelector((state) => state.services.servicesList);
  const uiState = useSelector((state) => state.ui);
  const { loading, status } = uiState;
  const uuid = useSelector(state => state.auth.uuid)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServicesData(uuid));
    setServiceCreated(false)
  }, [dispatch, serviceCreated, uuid]);

  function controlStatus(){
    setServiceCreated(true)
  }

  return (
    <Fragment>
      {!loading && status !== "Error!" && <Header text="Serviços" />}
      <Main>
        {!loading && status !== "Error!" && <CreateService onControlStatus = {controlStatus} />}
        {!loading && status !== "Error!" && servicesList.length > 0 && (
          <ServicesList services={servicesList} onControlStatus = {controlStatus} />
        )}
      </Main>
      {loading && status !== "Error!" && <LoadingSpinner />}
      {!loading && status === "Error!" && <Error />}
    </Fragment>
  );
}

export default ServicesPage;
