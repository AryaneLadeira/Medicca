export const cleanString = (str: string): string => {
  return str.replace(/[^\d]/g, '');
};

export const formatDateToYMD = (date: string) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};
