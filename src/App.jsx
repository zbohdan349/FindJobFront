import React, { useState } from "react";
import  {LoginPage}  from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SearchPage} from "./pages/SearchPage";
import { VacancyPage } from "./pages/VacancyPage";

import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
export const LoginContext = React.createContext("");
export const App = () => {
 const [isAuth,setIsAuth] = useState(localStorage.getItem("Authorization")!==null);
 const [role,setRole] = useState(localStorage.getItem("Role"));

 const logout =() =>{
  localStorage.clear();
  setIsAuth(false);
  setRole(null);
}
const login =() =>{
    setIsAuth(localStorage.getItem("Authorization")!==null);
  setRole(localStorage.getItem("Role"));
}
  return (
    <LoginContext.Provider value ={{isAuth,role,logout,login}}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route   index path={'vacancies/:vacancyId'} element={<VacancyPage/>}/>
          <Route index path='login' element={<LoginPage />} />
          
          <Route index path='search' element={<SearchPage />} />
         
        </Routes>
      </HashRouter>
    </LoginContext.Provider>
  );
};
