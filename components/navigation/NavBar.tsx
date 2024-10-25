import { getServerSession } from 'next-auth';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { authOptions } from '@/server/auth/auth-options';
import AuthButton from '../auth/AuthButton';

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Navbar maxWidth='full' isBordered>
      <NavbarBrand>
        <Link
          className='hover:text-sky-500 transition-colors'
          color='foreground'
          href='/'
        >
          Home
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem></NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        {session?.user?.role === 'admin' && (
          <>
            <NavbarItem>
              <Link
                className='hover:text-sky-500 transition-colors'
                color='foreground'
                href='/admin/rooms'
              >
                Rooms
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className='hover:text-sky-500 transition-colors'
                color='foreground'
                href='/admin/reservations'
              >
                Reservations
              </Link>
            </NavbarItem>
          </>
        )}
        {session?.user?.role === 'user' && (
          <>
            <NavbarItem>
              <Link
                className='hover:text-sky-500 transition-colors'
                color='foreground'
                href='/rooms'
              >
                Rooms
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className='hover:text-sky-500 transition-colors'
                color='foreground'
                href='/reservations'
              >
                My Reservations
              </Link>
            </NavbarItem>
          </>
        )}

        <NavbarItem>
          <AuthButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
