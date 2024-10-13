import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return { user: action.payload };
//     case "LOGOUT":
//       return { user: null };
//     default:
//       return state;
//   }
// };
// export const AuthContextProvider = ({ Children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null,
//   });
//   console.log("AuthContext state", state);
//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {Children}
//     </AuthContext.Provider>
//   );
// };
