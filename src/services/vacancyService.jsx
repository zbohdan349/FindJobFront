import { useHttp } from "../hooks/http.hook";

const _URL = "http://localhost:8080/";

export const useServices = () =>{
    const{request} =useHttp();
    const getRandomVacancies =  async function(){
        const response = await request(_URL);
        return  response;
    }

    const getFilterProperties = async()=>{
        const response = await request(`${_URL}find`)
        return response;
    }

    const authRequest = async (body) =>{
        const response = await request(`${_URL}auth/login`,'POST',JSON.stringify(body))
        return  response;
    }

    return {getRandomVacancies,authRequest,getFilterProperties}
}
