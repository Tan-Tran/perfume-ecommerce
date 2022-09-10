import {
  LOGIN_SUCCESS,
  FORM_RESET,
  REGISTER_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_FAILURE,
  RESET_PASSWORD_CODE_SUCCESS,
  RESET_PASSWORD_CODE_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SEND_REQUEST,
} from "../utils/constants/actions_types";

const initialState = {
  user: {},
  isLoading: false,
  isLoggedIn: false,
  isRegistered: false,
  success: "",
  error: "",
  errors: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEND_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, isLoading: false };

    case LOGIN_FAILURE:
      return { ...state, error: payload, isLoading: false };

    case REGISTER_SUCCESS:
      return { ...state, isRegistered: true, isLoading: false };

    case REGISTER_FAILURE:
      return { ...state, errors: payload, isLoading: false };

    case ACTIVATE_ACCOUNT_SUCCESS:
      return { ...state, success: payload, isLoading: false };

    case ACTIVATE_ACCOUNT_FAILURE:
      return { ...state, error: payload, isLoading: false };

    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, success: payload, isLoading: false };

    case FORGOT_PASSWORD_FAILURE:
      return { ...state, error: payload, isLoading: false };

    case RESET_PASSWORD_CODE_SUCCESS:
      return { ...state, user: payload, isLoading: false };

    case RESET_PASSWORD_CODE_FAILURE:
      return { ...state, error: payload, isLoading: false };

    case RESET_PASSWORD_SUCCESS:
      return { ...state, success: payload, isLoading: false };

    case RESET_PASSWORD_FAILURE:
      return { ...state, errors: payload, isLoading: false };

    case LOGOUT_SUCCESS:
      return { ...state, isLoggedIn: false, user: {}, isLoading: false };

    case FORM_RESET:
      return {
        ...state,
        error: "",
        errors: {},
        success: "",
        isLoading: false,
        isRegistered: false,
      };

    default:
      return state;
  }
};

export default reducer;
