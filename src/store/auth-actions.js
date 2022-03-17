import env from "react-dotenv";
import { uiActions } from "./ui-slice";
import { authActions } from "./auth-slice";

export const sendUserSignupRequest = (data) => {
  return async (dispatch) => {
    dispatch(
      uiActions.changeUiState({
        loading: true,
        status: "Posting",
        message: "Signing user up",
      })
    );

    async function signupUser() {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data.userEmail,
            password: data.userPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(!response.ok){
          throw new Error("Failed to signup user")
      }
    }

    try{
        await signupUser()
        dispatch(uiActions.changeUiState({
            loading: false,
            status: "Success",
            message: "New user registered"
        }))
    }catch(err){
        dispatch(uiActions.changeUiState({
            loading: false,
            status: "Error!",
            message: "Failed to register new user"
        }))
    }
  };
};

export const sendUserSigninRequest = (data) => {
    return async (dispatch) => {
      dispatch(
        uiActions.changeUiState({
          loading: true,
          status: "Posting",
          message: "Signing user in",
        })
      );
  
      async function signinUser() {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.API_KEY}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: data.userEmail,
              password: data.userPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

  
        if(!response.ok){
            throw new Error("Invalid email or password")
        }
        const resPayload = await response.json()
        return resPayload
      }
  
      try{
        const authData =  await signinUser()
        dispatch(authActions.setAuthData({
            authData
        }))

          dispatch(uiActions.changeUiState({
              loading: false,
              status: "Success",
              message: "Login successfuly "
          }))
      }catch(err){
          dispatch(uiActions.changeUiState({
              loading: false,
              status: "Error!",
              message: "Invalid email or password"
          }))
      }
    };
  };
