import { BASE_URL } from '@/lib/constants';
import UserDetails from '@/components/user/UserDetails';

type UserDetailsPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    isEdit: boolean;
  };
};

const fetchUserById = async (id: string) => {
  const result = await fetch(`${BASE_URL}/api/user/${id}`, {
    cache: 'no-store',
  });
  return await result.json();
};

export const generateMetadata = async ({
  params: { id },
}: UserDetailsPageProps) => {
  const user = await fetchUserById(id);

  return {
    title: `Admin Page on user: ${user.name}`,
  };
};

const UserDetailsPage = async ({ params: { id } }: UserDetailsPageProps) => {
  const user = await fetchUserById(id);

  return (
    <div className='flex justify-center items-center flex-col'>
      <UserDetails user={user} isAdmin />
    </div>
  );
};

export default UserDetailsPage;
