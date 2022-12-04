import { Button, Center } from "@mantine/core"
import { useEffect, useState } from "react"
import { CardComponent } from "../components/CardComponent"
import { MainLayout } from "../layout/MainLayout"
import { useServices } from "../services/vacancyService"

export const HomePage = () => {

  const [randomList,setRandomList] = useState([]);
  const {getRandomVacancies} = useServices();

  useEffect( () =>{
    getRandomVacancies().then( data => {
      setRandomList(data);
    });
  }, [] )

  const renderVacancies = (arr) => {
     return arr.map( el => {
      return(
      <div className="w-[460px]" key={el.id}>
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

  const list = renderVacancies(randomList);
  
  return (
    <MainLayout>
      <div className='h-96  w-full flex justify-center items-center bg-additional-color '>
          <Button>sadd</Button>
      </div>
      <Center>
        <div className="w-full flex justify-center pt-7 max-w-7xl">
          {list}
        </div>
      </Center>
    </MainLayout>
  )
}