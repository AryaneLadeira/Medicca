import { User } from './types';

export const isUnder18 = (user: User): boolean => {
  if (user.birthDate) {
    const birthYear = new Date(user.birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear < 18;
  }
  return false;
};
