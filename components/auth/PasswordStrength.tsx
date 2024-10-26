'use client';

import { useState, useEffect } from 'react';
import { passwordStrength } from 'check-password-strength';
import { getStrengthColor } from '@/lib/utils/clientHelperFunction';

const PasswordStrength = ({ watch }: any) => {
  const [strength, setStrength] = useState(0);
  const watchPassword = watch().password;

  useEffect(() => {
    setStrength(passwordStrength(watchPassword).id);
  }, [watchPassword]);

  const strengthColor = getStrengthColor(strength);

  return (
    <div className='col-span-2 flex gap-2'>
      {Array.from({ length: strength + 1 }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-32 rounded-md ${strengthColor}`}
        ></div>
      ))}
    </div>
  );
};

export default PasswordStrength;
