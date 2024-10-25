'use client';

import { toast } from 'react-toastify';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Input,
  //   Image,
} from '@nextui-org/react';
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/20/solid';
import useInput from '@/lib/hooks/useInput';

type CustomCardProps = {
  name: string;
  email: string;
  createdAt: string;
  emailVerified: string | null | undefined;
  username: string;
  isEdit?: boolean;
  isAdmin?: boolean;
  editUser?: (fullName: string, username: string) => Promise<void>;
  // activateUserEmail: () => void;
};

const CustomCard = ({
  name: fullName,
  email,
  createdAt,
  emailVerified,
  username: userName,
  isEdit,
  isAdmin,
  editUser,
}: // activateUserEmail,
CustomCardProps) => {
  const { name, username, onChangeHandler } = useInput(fullName, userName);

  const editUserHandler = () => {
    editUser && editUser(name, username);
    toast.success('User successfully updated.');
  };

  // const userEmailActivationHandler = () => {
  //   activateUserEmail();
  // };

  return (
    <Card className='max-w-[600px] min-w-[600px]'>
      <CardHeader className='flex gap-3 justify-center'>
        {/* <Image
            alt='image'
            height={40}
            radius='sm'
            src={image}
            width={40}
          /> */}
        <div className='flex justify-center'>{`${
          isAdmin ? 'USER:' : 'WELCOME'
        } ${name}`}</div>
      </CardHeader>
      <Divider />
      {!isEdit ? (
        <CardBody className='flex justify-center items-center'>
          {isAdmin && <div>{`Username: ${username}`}</div>}
          <div>{`Email: ${email}`}</div>
          <div>{`User creation date: ${createdAt}`}</div>
        </CardBody>
      ) : (
        <CardBody className='flex justify-center items-center'>
          <Input
            type='text'
            name='name'
            placeholder='Full Name'
            value={name}
            onChange={onChangeHandler}
          />
          <Input
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={onChangeHandler}
          />
          <div className='flex self-start m-2'>{`Email: ${email}`}</div>
          {emailVerified ? (
            <div className='flex self-start m-2'>{`Email verification date: ${emailVerified}`}</div>
          ) : (
            <div className='flex flex-row justify-center'>
              <div className='mr-2'>Not yet verified</div>
              <ShieldExclamationIcon className='w-5' />
            </div>
          )}
          <Button onClick={editUserHandler}>Edit</Button>
        </CardBody>
      )}
      <Divider />
      <CardFooter className='flex justify-center'>
        {!emailVerified ? (
          // <Button onClick={userEmailActivationHandler}>{`${
          //   isAdmin ? 'Activate User Email' : 'Resend Email Activation'
          // }`}</Button>
          <></>
        ) : (
          <div className='flex flex-row justify-center'>
            <div className='mr-2'>Email verified by user</div>
            <ShieldCheckIcon className='w-5' />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
