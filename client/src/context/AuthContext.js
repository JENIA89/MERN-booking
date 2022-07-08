import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  error: null,
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOGIN':
      return {
        user: null,
        isLoading: true,
        error: null,
      }
    case 'START_LOGIN':
      return {
        user: action.payload,
        isLoading: false,
        error: null,
      }
    case 'START_FAILURE':
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        user: null,
        isLoading: false,
        error: null,
      }
    default:
      return state;
  }
}

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user])
  

  return (
    <AuthContext.Provider value={{
      user: state.user,
      isLoading: state.isLoading,
      error: state.error,
      dispatch
      }}>
      {children}
    </AuthContext.Provider>
  )
}