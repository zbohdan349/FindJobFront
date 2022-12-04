import { MainLayout } from "../layout/MainLayout"
import { FilterForm } from "../components/FilterForm"
import { CardComponent } from "../components/CardComponent"
import { useServices } from "../services/vacancyService"
import { useState } from "react"
import { useEffect } from "react"
import { date } from "zod"

export const SearchPage = ( ) => {
  const [reqObj,setReqObj] = useState({})
  const {getRandomVacancies,getFilteredVacancies} = useServices();
  const [list,setList] = useState([]);

   

  useEffect( () => {
    console.log(reqObj)
      getFilteredVacancies(reqObj).then(
        data => {
          setList(data);
          console.log(data);
        }
      )
  },[reqObj])



  const updateReqProperties = (newObj) =>{
    setReqObj( {...reqObj,...newObj})
    
  }

  const renderVacancies = (arr) => {
    return arr.map( el => {
     return(
     <div className="w-[460px] mb-5" key={el.id}>
       <CardComponent
        id ={el.id}
         image={el.company.img}
         title={el.name}
         price={el.salary}
         companyName={el.company.name}
         desc={el.smallDescription}
         categories ={el.categories}
       />
     </div>)
   })
 }
  return (
    <MainLayout>
        <div className="container mx-auto text-text-color">
            <div className="container py-2 my-2 border-b-2 border-text-color text-4xl">Вакансії</div>
        </div>
        <div class="flex flex-row text-text-color text-2xl justify-center">
            <div className="basis-1/4 md:basis-2/4">
              {renderVacancies(list)}
            </div>
            <div className="basis-1/4 md:basis-1/4">
                <FilterForm updateReqProperties={updateReqProperties}/>
            </div>
        </div>
    </MainLayout>
  )
}