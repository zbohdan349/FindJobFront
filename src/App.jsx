import React, { useState } from "react";
import  {LoginPage}  from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SearchPage} from "./pages/SearchPage";

export const LoginContext = React.createContext();
export const App = () => {
 const [isAuth,setIsAuth] = useState(false)
  return (
    <LoginContext.Provider value ={{isAuth}}>
      <SearchPage/>
    </LoginContext.Provider>
  );
};
