import { useState } from 'react';
import { Modal, Button, Group, TextInput} from '@mantine/core';

import { useServices } from '../services/vacancyService'



const textColor={ label: 'text-text-color' }

let category ={name:''};


export function AddCategoryModal() {
    const [opened, setOpened] = useState(false);

    const {addCategoryRequest} = useServices();

    const addCategory = () =>{

        console.log(category)
        addCategoryRequest(category).then(r =>{
        setOpened(false);
        })
    }    

  return (
    <>
      <Modal 
        modal={'additional-color'}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Додайте вакансію"
      >
        <Group align="flex-end">
          <TextInput 
            placeholder="Категорія" 
            style={{ flex: 1 }} 
            onChange={event => category.name=event.currentTarget.value}/>
            <Button 
              color="gray" 
              onClick={addCategory}>
              Додати
            </Button>
        </Group>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Додати категорію</Button>
      </Group>
    </>
  );
}