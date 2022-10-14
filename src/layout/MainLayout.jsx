import { NavLink } from 'react-router-dom';
import {faInfinity} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Button, Divider } from '@mantine/core';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Avatar, Menu } from '@mantine/core';

export const MainLayout = ({children}) => {

  const location = useLocation()
  const [isAuth, setIsAuth] = useState(true)
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
          `${location.pathname === '/home' ? 'border-text-color' : 'border-none'}`
          )}
        >
          <a href='s' className=' text-text-color'>
            <NavLink to='/home'>Home</NavLink>
          </a>
        </li>
        <li className={clsx(
          'border-b-[1px] pb-1',
          `${location.pathname === '/test' ? 'border-text-color' : 'border-none'}`
          )}
        >
        <a href='s' className='pb-1 text-text-color'>
            <NavLink to='/test' >Test</NavLink>
          </a>
        </li>
      </ul>
      {!isAuth ? (<div className='pr-8'>
        <Button className='hover:bg-hover-color'>Log in</Button>
      </div>) : (
      <div className='pr-8'>
        <Menu shadow="md" width={140}>
      <Menu.Target >
          <div className='cursor-pointer'>
            <Avatar radius="xl">MK</Avatar>
          </div>
      </Menu.Target>

      <Menu.Dropdown className='bg-secondary-bg-color border-none '>
        <Menu.Item className='text-text-color hover:bg-hover-color' icon={''}>Settings</Menu.Item>
        <Menu.Item className='text-text-color hover:bg-hover-color' icon={''}>Messages</Menu.Item>
        <Menu.Item className='text-text-color hover:bg-hover-color' icon={''}>Gallery</Menu.Item>
        <Divider className=''/>
        <Menu.Item className='text-text-color hover:bg-hover-color' icon={''}>Log out</Menu.Item>
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