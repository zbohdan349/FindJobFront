import { MultiSelect, Checkbox, Slider, Button} from '@mantine/core';
import { useEffect,useState } from 'react';
import { useServices } from '../services/vacancyService'

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

export const FilterForm = (props) => {

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
    <div className="flex flex-col p-4 bg-additional-color border-0 rounded-md">
        <Category>
            <MultiSelect classNames={textColor}
                data={categories}
                placeholder="Оберіть категорію"
                label="КАТЕГОРІЇ"
                radius="md"
                size="md"
            />
        </Category>
        <Category>
            <Checkbox.Group
                className='pb-2'
                classNames={textColor}
                orientation="vertical"
                label="ОБЕРІТЬ БАЖАНИЙ РІВЕНЬ НАВИЧОК"
                spacing="xs"
                offset="sm"
                >
                {levels.map(
                    (level) => {
                        return <Checkbox color="gray" classNames={textColor} value={level} label={level} />
                    }
                )}   
                
            </Checkbox.Group>
        </Category>

        <Category isBorderHidden ={true}>
            <div className='pb-2'>БАЖАНА КОМПЕНСАЦІЯ</div>
            <Slider
                color="gray"
                radius="md"
                min = {minSalary}
                max = {maxSalary}
                showLabelOnHover={false}
            />
        </Category>
        <Button className='hover:bg-hover-color' size='md' type="submit">Шукати</Button>
    </div>
    );
};
