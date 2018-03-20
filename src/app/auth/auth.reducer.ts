import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true,
        token: action.payload
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false,
        token: null
      };
    default:
      return state;
  }
}

export const isAuthenticated = (state: AuthState) => state.isAuthenticated;
export const token = (state: AuthState) => state.token;
