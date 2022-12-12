import { NavLink,Link } from 'react-router-dom';
import {faInfinity} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Button, Divider } from '@mantine/core';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { useContext ,useEffect,useState} from 'react';
import { Avatar, Menu } from '@mantine/core';
import {LoginContext} from '../App'
import { AddVacancyModal } from '../components/AddVacancyModal';
import { AddCategoryModal } from '../components/AddCategoryModal';
import { Notification } from '../components/Notification';
import { useServices } from '../services/vacancyService';

export const MainLayout = ({children}) => {

  const location = useLocation();
  const {isAuth,role,logout} = useContext(LoginContext);
  const [img,setImg] = useState();
  const {getIMg} = useServices();

  useEffect ( ()=>{
   if(isAuth){
    getIMg().then(r =>{
      console.log(r)
      setImg(r)
    })
   }
    
  },[])



  return (
    <>
    <header className='w-full bg-secondary-bg-color'>
      <div className='w-full flex items-center justify-between'>
      <div className='flex p-2.5'>
        <p className='text-text-color text-2xl pr-2'><FontAwesomeIcon icon={faInfinity} /></p>
        <span className='text-text-color text-2xl'>Find Job</span>
      </div>
      <ul className='flex gap-3'>
        <li className={clsx(
          'border-b-[1px] pb-1',
          `${location.pathname === '/' ? 'border-text-color' : 'border-none'}`
          )}
        >
          <a href='s' className=' text-text-color'>
            <NavLink to='/'>Головна</NavLink>
          </a>
        </li>
        <li className={clsx(
          'border-b-[1px] pb-1',
          `${location.pathname === '/search' ? 'border-text-color' : 'border-none'}`
          )}
        >
        <a href='s' className='pb-1 text-text-color'>
            <NavLink to='/search' >Шукати</NavLink>
          </a>
        </li>
      </ul>
      {!isAuth ? (<div className='pr-8'>
        <Link to='/login'><Button className='hover:bg-hover-color'>Увійти</Button></Link>
        <Link to='/registration'><Button className='hover:bg-hover-color'>Зареєструватися</Button></Link>
      </div>) : (
        
        
      <div className='pr-8 flex'>
      {role ==="COMPANY"? 
        (
          <div className='flex'>
            <Notification/>
            <AddVacancyModal/>
          </div>
          
        ):null}
        {role ==="ADMIN"? 
        (
          <AddCategoryModal/>
        ):null}
        <Menu shadow="md" width={140}>
      <Menu.Target >
          <div className='cursor-pointer'>
            <Avatar src={img?.imgPath} radius="xl">MK</Avatar>
          </div>
      </Menu.Target>

      <Menu.Dropdown className='bg-secondary-bg-color border-none '>
       
        <Divider className=''/>
        <Menu.Item className='text-text-color hover:bg-hover-color' icon={''} onClick={logout}>
        <Link to={`/`}>Log out</Link></Menu.Item>
      </Menu.Dropdown>

    </Menu>
        
      </div>
      )}
      </div>
    </header>
      {children}
    </>
  )
}