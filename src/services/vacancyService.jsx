export const getRandomVacancies =  async function(){
    const response = await fetch("http://localhost:8080/vacancies/")
    return await response.json();
}
