import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/layout/header/Header";
import Main from "../components/layout/main/Main";
import QuoteListItem from "../components/quote list/QuoteListItem";
import classes from "./QuoteListPage.module.css";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { fetchQuoteData } from "../store/quote-actions";
import Card from "../components/UI/Card";

import Error from "../components/UI/Error";

//calls cars approved in the yard and pending approval quotes
function QuoteListPage() {
  const [filteredList, setFilteredList] = useState([]);
  const [searchParams, setSearchParams] = useState("name");
  const [isNoMatch, setIsNoMatch] = useState(false);
  const [useFilteredList, setUseFilteredList] = useState(false);
  const dispatch = useDispatch();
  const quoteList = useSelector((state) => state.quotes.quoteList);
  const { loading, status } = useSelector((state) => state.ui);
  const authState = useSelector(state => state.auth)
  const {uuid} = authState

  useEffect(() => {
    dispatch(fetchQuoteData(uuid));
  }, [dispatch, uuid]);

  let quoteListArr = [];
  if (!loading) {
    for (const key in quoteList) {
      quoteListArr.push({
        id: key,
        data: quoteList[key],
      });
    }
  }

  function getSearchParams(e) {
    setSearchParams(e.target.value);
  }

  function filterList(e) {
    const regex = new RegExp(`^${e.target.value}`, "gi");
    setUseFilteredList(true);
    if (searchParams === "name") {
      const filter = quoteListArr.filter((item) =>
        item.data.clientName.match(regex)
      );
      if (filter.length === 0) {
        setIsNoMatch(true);
      } else {
        setIsNoMatch(false);
        setFilteredList(filter);
      }
    } else {
      const filter = quoteListArr.filter((item) =>
        item.data.plate.match(regex)
      );
      if (filter.length === 0) {
        setIsNoMatch(true);
      } else {
        setIsNoMatch(false);
        setFilteredList(filter);
      }
    }
  }

  let allQuotes;
  if (!useFilteredList) {
    allQuotes = quoteListArr.map((item) => {
      return (
        <QuoteListItem
          key={item.id}
          id={item.id}
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
  } else {
    allQuotes = filteredList.map((item) => {
      return (
        <QuoteListItem
          key={item.id}
          id={item.id}
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
  }

  return (
    <Fragment>
      {loading && status !== "Error!" && <LoadingSpinner />}
      {!loading && status !== "Error!" && (
        <Fragment>
          <Header text="Orçamentos" />
          <Main>
            <Card>
              <div className={classes.filter}>
                <div>
                  <label htmlFor="type of filter">Filtrar por: </label>
                  <select id="type of filter" onChange={getSearchParams}>
                    <option value="name">Nome</option>
                    <option value="plate">Placa</option>
                  </select>
                </div>
                <input
                  placeholder="Digite aqui sua busca..."
                  onChange={filterList}
                />
              </div>
            </Card>
            {!isNoMatch && (
              <ul className={classes["quote-list"]}>{allQuotes}</ul>
            )}
            {isNoMatch && (
              <div className={classes["no-match"]}>
                <p>Nenhum item corresponde a sua pesquisa</p>
              </div>
            )}
          </Main>
        </Fragment>
      )}
      {!loading && status === "Error!" && <Error />}
    </Fragment>
  );
}

export default QuoteListPage;
