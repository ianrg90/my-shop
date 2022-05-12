import { Fragment, useState } from "react";
import Header from "../components/layout/header/Header";
import Main from "../components/layout/main/Main";
import NewQuoteForm from "../components/quote form/NewQuoteForm";
import DamagesForm from "../components/damages form/DamagesForm";

function NewQuotePage() {
  const [isDamageFormDone, setIsDamageFormDone] = useState(false)

  function completeDamageForm(){
    setIsDamageFormDone(true)
  }

  return (
    <Fragment>
      <Header text="Quote Sheet" />
      <Main>
        {!isDamageFormDone && <DamagesForm onCompleteDamageForm = {completeDamageForm}/>}
        {isDamageFormDone && <NewQuoteForm/>}
      </Main>
    </Fragment>
  );
}

export default NewQuotePage;
