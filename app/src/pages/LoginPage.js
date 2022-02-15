import { Fragment, useState } from "react";
import Signin from "../components/login/Signin";
import Signup from "../components/login/Signup";

function LoginPage() {
  const [displaySignupPage, setDisplaySignupPage] = useState(false);

  function handlePageChange() {
    setDisplaySignupPage((prevState) => {
      return !prevState;
    });
  }

  return (
    <Fragment>
      {!displaySignupPage && <Signin onChangePage={handlePageChange} />}
      {displaySignupPage && <Signup onChangePage={handlePageChange} />}
    </Fragment>
  );
}

export default LoginPage;
