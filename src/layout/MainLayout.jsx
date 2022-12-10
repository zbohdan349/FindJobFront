import { NavLink,Link } from 'react-router-dom';
import {faInfinity} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Button, Divider } from '@mantine/core';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Avatar, Menu } from '@mantine/core';
import {LoginContext} from '../App'
import { AddVacancyModal } from '../components/AddVacancyModal';
import { AddCategoryModal } from '../components/AddCategoryModal';

export const MainLayout = ({children}) => {

  const location = useLocation();
  const {isAuth,role,logout} = useContext(LoginContext);


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
            <NavLink to='/'>Home</NavLink>
          </a>
        </li>
        <li className={clsx(
          'border-b-[1px] pb-1',
          `${location.pathname === '/search' ? 'border-text-color' : 'border-none'}`
          )}
        >
        <a href='s' className='pb-1 text-text-color'>
            <NavLink to='/search' >Search</NavLink>
          </a>
        </li>
      </ul>
      {!isAuth ? (<div className='pr-8'>
        <Link to='/login'><Button className='hover:bg-hover-color'>Log in</Button></Link>
      </div>) : (
        
        
      <div className='pr-8'>
         {role ==="COMPANY"? 
        (
          <AddVacancyModal/>
        ):null}
        {role ==="ADMIN"? 
        (
          <AddCategoryModal/>
        ):null}
        <Menu shadow="md" width={140}>
      <Menu.Target >
          <div className='cursor-pointer'>
            <Avatar radius="xl">MK</Avatar>
          </div>
      </Menu.Target>

      <Menu.Dropdown className='bg-secondary-bg-color border-none '>
       
        
        <Menu.Item className='text-text-color hover:bg-hover-color' icon={''}>Messages</Menu.Item>
        <Menu.Item className='text-text-color hover:bg-hover-color' icon={''}>Gallery</Menu.Item>
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