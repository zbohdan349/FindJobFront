import { useState,useEffect } from 'react';
import { useParams} from 'react-router-dom';
import {useServices} from '../services/vacancyService';
import { Card, Text, Badge, Button, Group, Divider, Center} from "@mantine/core";
import { MainLayout } from '../layout/MainLayout';
import {LoginContext} from '../App';
import { useContext } from 'react';

export const VacancyPage = () =>{
    const [vacancy,setVacancy] =useState({});
    const { vacancyId } = useParams();
    const {getVacancyById,addTeamWorkRequest} = useServices();
    const {isAuth,role} = useContext(LoginContext);

    useEffect( () =>{
        getVacancyById(vacancyId)
            .then( (newVacancy) =>{
                console.log(newVacancy)
                setVacancy(newVacancy)
            })
    },[vacancyId]);

     const addTeamWork = () =>{
      addTeamWorkRequest({id:vacancyId}).then(result =>{
        let m;
        if(result){
          m ='Запит відправлено';
        }else{
          m = 'Ви уже відправляли запит';
        }
        alert(m);
      })
     }
    return(

      <MainLayout>
        <Center>
         <div className="w-full flex justify-center mt-2 p-8 max-w-7xl bg-additional-color">
            <div class="container mx-auto">
              
              <Group position="apart" className="pb-4">
              <Text className='text-text-color text-lg' weight={500}>{vacancy.name}</Text>
              <Badge className='bg-gray-300 text-lg text-slate-500' >
                {vacancy.salary +"$"}
              </Badge>
            </Group>
            <Divider />
            <Card.Section className='flex items-center px-5 pb-4 pt-4' component="a">
              <div className="w-[100px]  h-[100px] rounded-md">
              <img
                src={vacancy.company?.img}  
                alt="Norway"
                className="w-full h-full object-cover rounded-md"
              />
              </div>
              
              <p className="max-w-[140px] text-2xl text-text-color pl-2 ">{vacancy.company?.name}</p> 
            </Card.Section>

            {vacancy && vacancy.categories?.map( category =>{
              return(
                <Badge key={category.id} className='bg-gray-300 text-slate-500 m-1' >
                  {category.name}
                </Badge>
              )
            })}

            <Text size="sm" className='text-text-color'>
              {vacancy.bigDescription}
            </Text>
            {!isAuth ? <Button disabled> Для подальшої взаємодії авторизуйтесь</Button>:null}
            {role ==="COMPANY" ? <Button disabled> Для подальшої взаємодії змініть роль</Button>:null}
            {role ==="ADMIN" ? <Button disabled> Для подальшої взаємодії змініть роль</Button>:null}
            {role ==="USER" ? <Button 
            className='w-full mt-2 hover:bg-hover-color transition-all'
            onClick={addTeamWork}>
              Відправити резюме
            </Button>:null}
            </div>
      </div>
      </Center>
      </MainLayout>
      
    )
} 