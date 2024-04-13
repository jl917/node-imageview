import * as n from "nanoid";
import dayjs from 'dayjs';

export const nanoid = n.customAlphabet("1234567890abcdef", 10);

export const getFilename = (): string => {
  return `${dayjs().format('YYYYMMDD')}/${nanoid()}`;
};
