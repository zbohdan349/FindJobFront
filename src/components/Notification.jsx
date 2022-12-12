import { useState,useEffect } from 'react';
import { Modal, Button, Group, TextInput,Container} from '@mantine/core';

import { useServices } from '../services/vacancyService'



const textColor={ label: 'text-text-color' }

let category ={name:''};


export function Notification() {
    const [opened, setOpened] = useState(false);
    const [clients, setClients] = useState([]);

    const {getActiveTeamWorkRequest,updateTeamWorkRequest} = useServices();

    const getAllTeamWorks =()=>{
        getActiveTeamWorkRequest().then( clients => {
            setClients(clients);
        })
    }

    useEffect( () => {
        getAllTeamWorks();
    },[])


    const updateTeamwork = (email) =>{
       updateTeamWorkRequest(email).then(r =>{
            if(r) {
                getAllTeamWorks();
            }
        })
    }    

    const renderClients = (arr) => {
        return arr.clients?.map( (el, i) => {
         return(
            <Group key={i} align="flex-end">
                <Container size="xs" className='border-solid border-2 p-1'>
                    {el}
                </Container>
            <Button className='bg-hover-color transition-all'
                    onClick={() =>updateTeamwork(el)}>
                Ок
            </Button>
        </Group>
         )
       })
     }

  return (
    <>
      <Modal 
        modal={'additional-color'}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Нові запити"
      >
        {renderClients(clients)}
      </Modal>

      <Group position="center">
        <Button  className='hover:bg-hover-color' onClick={() => setOpened(true)}>Нові запити</Button>
      </Group>
    </>
  );
}