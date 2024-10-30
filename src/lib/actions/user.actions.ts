'use server';

import { signIn, signOut } from '@/auth';

const login = async () => {
  await signIn('google');
};

const logout = async () => {
  await signOut();
};

export { login, logout };
