import { isUUID } from 'class-validator';

export const extractUUID = (value: unknown): string | undefined => {
  if (typeof value === 'string' && isUUID(value)) return value;
  if (Array.isArray(value) && typeof value[0] === 'string' && isUUID(value[0])) return value[0];
  return undefined;
};

