import Register from '@/components/auth/Register';

export const metadata = {
  title: 'Registration Page',
};

const RegisterPage = () => {
  return (
    <div className='flex justify-center items-center gap-3'>
      <Register />
    </div>
  );
};

export default RegisterPage;
