import { MultiSelect, Checkbox, Slider, Button} from '@mantine/core';
import { useEffect,useState } from 'react';
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
    categories: z.any(),
    levels: z.any(),
    salary: z.any()
  });

let obj =
    {
        categories: [],
        levels: [],
        minSalary: 0
    };

export const FilterForm = (props) => {

    const { register, handleSubmit} = useForm({
        resolver: zodResolver(schema)
      });

    const[categories,setCategories] = useState([]) ;
    const[levels,setLevels]  = useState([]);
    const [maxSalary,setMaxSalary] = useState(1);
    const [minSalary,setMinSalary] = useState(0);

    const {getFilterProperties} = useServices();

    useEffect( () => {

        getFilterProperties()
            .then( (data) =>{  
                setCategories( 
                    data.categories.map( (category) => {
                    return { value:category.id , label: category.name }
                })
            )
            setLevels(data.levels);
            setMaxSalary(data.maxSalary);
            setMinSalary(data.minSalary);
        })
    },[])

    return (
    <form onSubmit={handleSubmit(d => {
        props.updateReqProperties(obj);
    })}
        className="flex flex-col p-4 bg-additional-color border-0 rounded-md">
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
            <Checkbox.Group
                className='pb-2'
                classNames={textColor}
                onChange = {value => obj.levels=value}
                orientation="vertical"
                label="ОБЕРІТЬ БАЖАНИЙ РІВЕНЬ НАВИЧОК"
                spacing="xs"
                offset="sm"
                >
                {levels.map(
                    (level,i) => {
                        return <Checkbox key={i} color="gray" classNames={textColor} value={level} label={level} />
                    }
                )}   
                
            </Checkbox.Group>
        </Category>

        <Category isBorderHidden ={true}>
            <div className='pb-2'>БАЖАНА КОМПЕНСАЦІЯ</div>
            <Slider
                color="gray"
                radius="md"
                onChangeEnd = {value => obj.minSalary=value-1}
                min = {minSalary}
                max = {maxSalary}
                showLabelOnHover={false}
            />
        </Category>
        <Button className='hover:bg-hover-color' size='md' type="submit">Шукати</Button>
    </form>
    );
};
