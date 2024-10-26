import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth/auth-options';
import { getUserProfileByEmail } from '@/server/actions/userActions';
import UserDetails from '@/components/user/UserDetails';
import connectDB from '@/server/mongo/config';

export const metadata = {
  title: 'Profile Page',
};

const ProfilePage = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email ? session.user.email : '';
  const user = await getUserProfileByEmail(sessionEmail);

  //   const { id, fullName, email } = user;

  //   const activateUserEmailHandler = async () => {
  //     'use server';
  //     try {
  //       sendMailTemplate(id, fullName, email, 'activation', activationTemplate);
  //     } catch (error) {
  //      console.log(error);
  //     }
  //   };

  return (
    <div className='flex justify-center items-center flex-col'>
      <UserDetails user={user} />
    </div>
  );
};

export default ProfilePage;
