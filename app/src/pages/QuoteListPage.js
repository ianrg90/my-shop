import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/layout/header/Header";
import Main from "../components/layout/main/Main";
import QuoteListItem from "../components/quote list/QuoteListItem";
import classes from "./QuoteListPage.module.css";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { fetchQuoteData } from "../store/quote-actions";

import Error from "../components/UI/Error";

//calls cars approved in the yard and pending approval quotes
function QuoteListPage() {
  const dispatch = useDispatch();
  const quoteList = useSelector((state) => state.quotes.quoteList);
  const { loading, status } = useSelector((state) => state.ui);
  
  useEffect(() => {
    dispatch(fetchQuoteData());
  }, [dispatch]);

  let quoteListArr = [];
  if (!loading) {
    for (const key in quoteList) {
      quoteListArr.push({
        id: key,
        data: quoteList[key],
      });
    }
  }

  const allQuotes = quoteListArr.map((item) => {
    return (
      <QuoteListItem
        key={item.id}
        id = {item.id}
        client={item.data.clientName}
        plate={item.data.plate}
        date={item.data.date}
        make={item.data.make}
        color={item.data.color}
        model={item.data.model}
        status={item.data.status}
      />
    );
  });

  return (
    <Fragment>
      {loading && status !== "Error!" && <LoadingSpinner />}
      {!loading && status !== "Error!" && (
        <Fragment>
          <Header text="Orçamentos" />
          <Main>
            <ul className={classes["quote-list"]}>{allQuotes}</ul>
          </Main>
        </Fragment>
      )}
      {!loading && status === "Error!" && <Error/>}
    </Fragment>
  );
}

export default QuoteListPage;
