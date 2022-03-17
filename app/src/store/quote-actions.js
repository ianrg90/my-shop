import { uiActions } from "./ui-slice";
import { quoteActions } from "./quote-slice";

//action creator to dispatch async fucntions
export const postQuoteData = (quoteData, uuid) => {
  return async (dispatch) => {
    dispatch(
      uiActions.changeUiState({
        loading: true,
        status: "Posting",
        message: "Posting quote data",
      })
    );

    async function sendRequest() {
      const response = await fetch(
        `https://my-shop3-b2989-default-rtdb.firebaseio.com/${uuid}/quotes.json`,
        {
          method: "POST",
          body: JSON.stringify(quoteData),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post quote data!");
      }
    }
    try {
      await sendRequest();
      dispatch(
        uiActions.changeUiState({
          loading: false,
          status: "Success",
          message: "Quote posted succesfuly",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.changeUiState({
          loading: false,
          status: "Error!",
          message: "Failed to post quote data",
        })
      );
    }
  };
};

export const fetchQuoteData = (uuid) => {
  return async (dispatch) => {
    dispatch(
      uiActions.changeUiState({
        loading: true,
        status: "Fetching",
        message: "Fetching quote data",
      })
    );

    const fetchData = async () => {
      const response = await fetch(
        `https://my-shop3-b2989-default-rtdb.firebaseio.com/${uuid}/quotes.json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quote data");
      }

      const data = await response.json();
      
      return data
    };
    try {
      const quoteData = await fetchData();
      dispatch(
        quoteActions.getQuoteList({
          quoteData,
        })
      );

      dispatch(
        uiActions.changeUiState({
          loading: false,
          status: "Success",
          message: "Quote data fetched",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.changeUiState({
          loading: false,
          status: "Error!",
          message: "Failed to fetch quote data",
        })
      );
    }
  };
};

export const deleteQuoteData = (id, uuid) => {
  return async (dispatch) => {
    dispatch(
      uiActions.changeUiState({
        loading: true,
        status: "Deleting",
        message: "Deleting quote data",
      })
    );

    async function deleteData() {
      const response = await fetch(
        `https://my-shop3-b2989-default-rtdb.firebaseio.com/${uuid}/quotes/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }
    }

    try {
      await deleteData();
      dispatch(
        uiActions.changeUiState({
          loading: false,
          status: "Success",
          message: "Quote deleted",
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

export const updateStatusData = (id, uuid ,payload) => {
  return async (dispatch) => {
    dispatch(
      uiActions.changeUiState({
        loading: true,
        status: "Updating!",
        message: "Updating status",
      })
    );

    async function updateData() {
      const response = await fetch(
        `https://my-shop3-b2989-default-rtdb.firebaseio.com/${uuid}/quotes/${id}/status.json`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }
    }

    try {
      await updateData();
      dispatch(
        uiActions.changeUiState({
          loading: false,
          status: "Success",
          message: "Status updated",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.changeUiState({
          loading: false,
          status: "Error!",
          message: "Failed to update data",
        })
      );
    }
  };
};
