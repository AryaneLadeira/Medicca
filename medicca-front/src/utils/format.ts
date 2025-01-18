export const cleanString = (str: string): string => {
  return str.replace(/[^\d]/g, '');
};
