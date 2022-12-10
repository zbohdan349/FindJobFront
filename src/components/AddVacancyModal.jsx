import { useState,useEffect } from 'react';
import { Modal, Button, Group, NumberInput,TextInput,Textarea} from '@mantine/core';

import { MultiSelect, Checkbox, Radio} from '@mantine/core';
import { useServices } from '../services/vacancyService'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


const textColor={ label: 'text-text-color' }
const Category = (props) => {
    let border ="mb-2 pb-2";
    props.isBorderHidden ? border += null: border+= " border-b-2";
    return(
        <div className = {border}>
            {props.children}
        </div>
    )

}

const schema = z.object({
  name:z.string().min(1,{message:'Введіть назву'}),
  categories: z.array().min(1,{message:'Введіть назву'}),
  levels: z.any(),
  salary: z.any()
})
let obj =
    {
      name:'',
      smallDescription:'',
      categories: [],
      level: '',
      salary: 0
    };

export function AddVacancyModal() {
  const [opened, setOpened] = useState(false);

  const[categories,setCategories] = useState([]) ;
    const[levels,setLevels]  = useState([]);

    const {getFilterProperties,addVacancyRequest} = useServices();

    useEffect( () => {

        getFilterProperties()
            .then( (data) =>{  
                setCategories( 
                    data.categories.map( (category) => {
                    return { value:category.id , label: category.name }
                })
            )
            setLevels(data.levels);
        })
    },[])

  const { register, handleSubmit} = useForm({
    resolver: zodResolver(schema)
  });

  const addVacancy = () =>{

    
    console.log(obj)
    addVacancyRequest(obj).then(r =>{
      console.log(r);
      setOpened(false);
    })
  }    

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Додайте вакансію"
      >
         <form onSubmit={handleSubmit(d => {
          //addVacancyRequest(d);
          setOpened(false);
    })}
        className="flex flex-col p-4 bg-additional-color border-0 rounded-md">
        <Category>
          <TextInput
            classNames={textColor}
            onChange = {event => obj.name=event.currentTarget.value}
            label="НАЗВА ВАКАНСІЇ"
            placeholder="Введіть назву"
          />
        </Category>  
        <Category>
          <Textarea
            classNames={textColor}
            placeholder="Введіть опис вакансії"
            label="ОПИС ВАКАНСІЇ"
            onChange={event => obj.smallDescription=event.currentTarget.value}
          />
        </Category> 
        <Category>
            <MultiSelect classNames={textColor}
                data={categories}
                placeholder="Оберіть категорію"
                onChange={value => obj.categories=value}
                label="КАТЕГОРІЇ"
                radius="md"
                size="md"
            />
        </Category>
        <Category>
          <Radio.Group
            className='pb-2'
            classNames={textColor}
            onChange = {value => obj.level=value}
            orientation="vertical"
            label="ОБЕРІТЬ РІВЕНЬ ВАКАНСІЇ"
            size="md"
          >
            {levels.map(
                (level,i) => {
                    return <Radio key={i} color="gray" classNames={textColor} value={level} label={level} />
                }
            )}
          </Radio.Group>
        </Category>

        <Category isBorderHidden ={true} classNames={textColor}>
          <NumberInput
            classNames={textColor}
            onChange = {value => obj.salary=value}
            mt="xl"
            label="ЗАРПЛАТА"
            placeholder="Введіть зарплату"
          />
        </Category>

        <Button className='hover:bg-hover-color' 
                size='md'
                onClick={addVacancy} 
                type="submit">Створити</Button>
    </form>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Додати вакансію</Button>
      </Group>
    </>
  );
}