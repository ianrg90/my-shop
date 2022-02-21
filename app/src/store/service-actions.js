import { uiActions } from "./ui-slice";
import {serviceActions} from "./services-slice"

export const postServiceData = (serviceData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.changeUiState({
        loading: true,
        status: "Posting",
        message: "Posting service data",
      })
    );

    async function postService() {
      const response = await fetch(
        "https://my-shop-2-da3a3-default-rtdb.firebaseio.com/services.json",
        {
          method: "POST",
          body: JSON.stringify(serviceData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post quote data");
      }
    }

    try {
      await postService();
      dispatch(
        uiActions.changeUiState({
          loading: false,
          status: "Success",
          message: "Service posted succesfuly",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.changeUiState({
          loading: false,
          status: "Error!",
          message: "Failed to post services data",
        })
      );
    }
  };
};

export const fetchServicesData = () => {
    return async (dispatch) => {
      dispatch(
        uiActions.changeUiState({
          loading: true,
          status: "Fetching",
          message: "Fetching service data",
        })
      );
  
      const fetchServices = async () => {
        const response = await fetch(
          "https://my-shop-2-da3a3-default-rtdb.firebaseio.com/services.json"
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch service data");
        }
  
        const data = await response.json();
        let servicesArr = []
        for(const key in data){
          servicesArr.push({id: key, type: data[key]})
        }
        return servicesArr;
      };
      try {
        const servicesData = await fetchServices();
        dispatch(serviceActions.populateServicesList({
            servicesData
        }))
  
        dispatch(
          uiActions.changeUiState({
            loading: false,
            status: "Success",
            message: "Services data fetched",
          })
        );
      } catch (err) {
        dispatch(
          uiActions.changeUiState({
            loading: false,
            status: "Error!",
            message: "Failed to fetch services data",
          })
        );
      }
    };
  };

  export const deleteServiceData = (id) => {
    return async (dispatch) => {
      dispatch(
        uiActions.changeUiState({
          loading: true,
          status: "Deleting",
          message: "Deleting service data",
        })
      );
  
      async function deleteService() {
        const response = await fetch(
          `https://my-shop-2-da3a3-default-rtdb.firebaseio.com/services/${id}.json`,
          {
            method: "DELETE",
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to delete data");
        }
      }
  
      try {
        await deleteService();
        dispatch(
          uiActions.changeUiState({
            loading: false,
            status: "Success",
            message: "Service deleted",
          })
        );
      } catch (err) {
        dispatch(
          uiActions.changeUiState({
            loading: false,
            status: "Error!",
            message: "Failed to delete data",
          })
        );
      }
    };
  };