import { TextInput, Button, Group, Box,Radio } from '@mantine/core';
import {useServices} from '../services/vacancyService'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const schema = z.object({
  email: z.string().email({message:'Некорктний емеіл'}),
  password: z.string().min(1,{message:'пусте поле'}),
  role: z.string()
});

export function RegistrationPage() {

const navigate = useNavigate();

const {registrationRequest} =useServices();


const textColor={ label: 'text-text-color' }


const { register, handleSubmit,formState: { errors }} = useForm({
    resolver: zodResolver(schema)
  });

  const sendRegistrationRequest = (body) =>{
    registrationRequest(body)
        .then((response) =>{

            if(response)navigate("/login")
            
        })
        .catch((m) => alert(m))
  }
 

  return (
    <div className='h-screen  w-full flex justify-center items-center'>
        <Box className='bg-additional-color text-text-color border-0 w-96 rounded-lg' shadow="sm" p="lg" radius="md">
            <form onSubmit={handleSubmit(d => sendRegistrationRequest(d))}>
                Email
                <TextInput
                withAsterisk
                placeholder="your@email.com"
                radius="md"
                size="md"
                error={errors.email && errors.email.message }
                {...register('email')}
                />
                <br />
                Password
                <TextInput
                type="password"    
                withAsterisk
                placeholder="Password"
                radius="md"
                size="md"
                error ={errors.password && errors.password.message}
                {...register('password')}
                />
                <br/>
                <Radio.Group
                classNames={textColor}
                defaultValue ={"USER"}
                name="favoriteFramework"
                orientation="vertical"
                label="Оберіть роль"
                spacing="xs"
                error ={errors.role && errors.role.message}
                
                >
                    <Radio key={1} {...register('role')} classNames={textColor} color="gray" value="USER" label="Шукач" />
                    <Radio key={2} {...register('role')} classNames={textColor} color="gray" value="COMPANY" label="Компанія" />
                    
                </Radio.Group>

                <Group position="right" mt="md">
                <Button className='hover:bg-hover-color' size='md' type="submit">Зареєструватися</Button>
                </Group>
            </form>
        </Box>
    </div>
    
  );
}