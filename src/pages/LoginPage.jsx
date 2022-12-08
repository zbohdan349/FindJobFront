import { TextInput, Button, Group, Box } from '@mantine/core';
import {useServices} from '../services/vacancyService'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {LoginContext} from '../App'
import * as z from "zod";
import { useContext } from 'react';

const schema = z.object({
  email: z.string().min(1,{message:'Empty field'}),
  password: z.string().min(1,{message:'Empty field'})
});

export function LoginPage() {

const navigate = useNavigate();

const {authRequest} =useServices();

const {login} = useContext(LoginContext);



const { register, handleSubmit,formState: { errors }} = useForm({
    resolver: zodResolver(schema)
  });

  const sendAuthRequest = (body) =>{
    authRequest(body)
        .then((response) =>{
            localStorage.setItem("Authorization",`Bearer ${response.accessToken}`);
            localStorage.setItem("Role",`${response.role}`);

            login()
            navigate("/")
        })
        .catch(() => alert("Bad Credential"))
  }
 

  return (
    <div className='h-screen  w-full flex justify-center items-center'>
        <Box className='bg-additional-color text-text-color border-0 w-96 rounded-lg' shadow="sm" p="lg" radius="md">
            <form onSubmit={handleSubmit(d => sendAuthRequest(d))}>
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

                <Group position="right" mt="md">
                <Button className='hover:bg-hover-color' size='md' type="submit">Login</Button>
                </Group>
            </form>
        </Box>
    </div>
    
  );
}