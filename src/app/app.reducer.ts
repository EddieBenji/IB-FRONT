import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { authReducer, AuthState, isAuthenticated } from './auth/auth.reducer';
import { isLoading, uiReducer, UIState } from './shared/ui.reducer';

export interface AppState {
  ui: UIState,
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
};
export const getUiState = createFeatureSelector<UIState>('ui');
export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getIsAuthenticated = createSelector(getAuthState, isAuthenticated);
export const getIsLoading = createSelector(getUiState, isLoading);
