import {
  AUTHENTICATED,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SIGNOUT,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
  HIDE_LOADING,
  IS_USER_ACTIVATED,
  SET_TOKEN,
} from "redux/constants/Auth";

export interface IAuth {
  loading?: boolean;
  message?: string;
  showMessage?: boolean;
  redirect?: string;
  token?: string;
  isAuth?: boolean;
  userActivated?: boolean;
}
const initState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  // Remove this when in development
  token: "123",
  isAuth: false,
  userActivated: false,
};
const auth = (state = initState, action: any) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: "/",
        token: action.token,
        isAuth: true,
      };

    case SHOW_AUTH_MESSAGE:
      return {
        ...state,
        message: action.message,
        showMessage: true,
        loading: false,
      };
    case HIDE_AUTH_MESSAGE:
      return {
        ...state,
        message: "",
        showMessage: false,
      };
    case SIGNOUT:
      return {
        ...state,
        token: null,
        redirect: "/auth/login",
        loading: false,
        isAuth: false,
      };

    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        redirect: "/auth/login",
        loading: false,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.token,
      };
    }
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
      return {
        ...state,
        loading: false,
        token: action.token,
      };
    }
    case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
      return {
        ...state,
        loading: false,
        token: action.token,
      };
    }
    case IS_USER_ACTIVATED:
      return {
        ...state,
        userActivated: action.userActivated,
        activationToken: action.activationToken,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default auth;
