import bcrypt from "bcrypt";

export const hashValue = async (value: string, saltRounds?: number) =>
  bcrypt.hash(value, saltRounds || 10);

export const compareValue = (value: string, hashedValue: string) =>
  bcrypt.compare(value, hashedValue).catch(() => false);
