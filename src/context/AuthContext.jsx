/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);
  let saveLoginData = () => {
    let decodedToken = localStorage.getItem("token");
    let encodedToken = jwtDecode(decodedToken);
    console.log(encodedToken);
    setLoginData(encodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
  }, []);
  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {props.children}
    </AuthContext.Provider>
  );
}
