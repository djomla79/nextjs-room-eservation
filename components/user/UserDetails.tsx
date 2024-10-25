'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CustomCard from '../shared/CustomCard';
import { UserDetailsType } from '@/lib/types/userTypes';

type UserDetailsProps = {
  user: UserDetailsType;
  isEdit?: boolean;
  isAdmin?: boolean;
  editUser?: (name: string, username: string) => Promise<void>;
};

const UserDetails = ({ user, isEdit, isAdmin, editUser }: UserDetailsProps) => {
  const { update } = useSession();
  const { _id: id, name, email, createdAt, username, emailVerified } = user;

  useEffect(() => {
    update({ id: id });
  }, []); // eslint-disable-line

  return (
    <CustomCard
      name={name}
      email={email}
      createdAt={createdAt}
      username={username}
      emailVerified={emailVerified}
      isEdit={isEdit}
      isAdmin={isAdmin}
      editUser={editUser}
      // activateUserEmail={activateUserEmail}
    />
  );
};

export default UserDetails;
