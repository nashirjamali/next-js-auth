'use server';

import { z } from 'zod';
import { createSession, deleteSession } from '../lib/session';
import { redirect } from 'next/navigation';
import { LoginState } from '@/types/actions';

const testUser = {
  id: '1',
  email: 'test@mail.com',
  password: 'test123',
};

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z.string().trim(),
});

export const login = async (_prevState: LoginState, formData: FormData) => {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ['Invalid email or password'],
      },
    };
  }

  await createSession(testUser.id);

  redirect('/dashboard');
};

export const logout = async () => {
  await deleteSession();
  redirect('/login');
};
