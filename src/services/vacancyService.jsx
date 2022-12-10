import { useHttp } from "../hooks/http.hook";

const _URL = "http://localhost:8080/";

export const useServices = () =>{
    const{request} =useHttp();
    const getRandomVacancies =  async function(){
        const response = await request(_URL);
        return  response;
    }
    const getFilteredVacancies =  async function(body){
        console.log(body)
        const response = await request(`${_URL}vacancies`,'POST',JSON.stringify(body));
        return  response;
    }

    const getVacancyById =  async function(id){
        const response = await request(`${_URL}vacancies/${id}`);
        return  response;
    }

    const getFilterProperties = async()=>{
        const response = await request(`${_URL}find`);
        return response;
    }

    const authRequest = async (body) =>{
        const response = await request(`${_URL}auth/login`,'POST',JSON.stringify(body));
        return  response;
    }

    const addVacancyRequest = async (body) =>{
        const response = await request(`${_URL}addVacancy`,'POST',JSON.stringify(body));
        return  response;
    }

    const addCategoryRequest = async (body) =>{
        const response = await request(`${_URL}categories`,'POST',JSON.stringify(body));
        return  response;
    }
    const addTeamWorkRequest = async (body) =>{
        const response = await request(`${_URL}teamwork`,'POST',JSON.stringify(body));
        return  response;
    }


    return {
        getRandomVacancies,
        authRequest,
        getFilterProperties,
        getFilteredVacancies,
        getVacancyById,
        addVacancyRequest,
        addCategoryRequest,
        addTeamWorkRequest
    }
}

