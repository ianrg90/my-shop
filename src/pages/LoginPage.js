import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendUserSignupRequest, sendUserSigninRequest } from "../store/auth-actions";
import {authActions} from "../store/auth-slice"
import Signin from "../components/login/Signin";
import Signup from "../components/login/Signup";
import LoadingSpinner from "../components/UI/LoadingSpinner"
import Error from "../components/UI/Error"

function LoginPage() {
  const [displaySignupPage, setDisplaySignupPage] = useState(false);
  const dispatch = useDispatch()
  const uiState = useSelector(state => state.ui)
  const {loading, status} = uiState

  function handlePageChange() {
    setDisplaySignupPage((prevState) => {
      return !prevState;
    });
  }

  function getUserLogInfo(obj) {
    if(displaySignupPage){
      dispatch(sendUserSignupRequest(obj))
    }
    else{
      dispatch(sendUserSigninRequest(obj))
    }
  }

  useEffect(() => {
    dispatch(authActions.setAuthData({
      authData: {
        idToken: null,
        localId: null
      }
    }))
  }, [dispatch])

  return (
    <Fragment>
      {loading && status !== "Error!" && <LoadingSpinner/>}
      {!loading && status === "Error!" && <Error/>}
      {!displaySignupPage &&  !loading && status !== "Error!" && (
        <Signin
          onChangePage={handlePageChange}
          onGetUserLogInfo={getUserLogInfo}
        />
      )}
      {displaySignupPage && !loading && status !== "Error!" && (
        <Signup
          onChangePage={handlePageChange}
          onGetUserLogInfo={getUserLogInfo}
        />
      )}
    </Fragment>
  );
}

export default LoginPage;
