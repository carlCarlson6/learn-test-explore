import { compare, hash } from "bcrypt";

export const hashPassword = (inputPassword: string) => hash(inputPassword, 20);

const validatePassword = (inputPassword: string, hashedPassword: string) => compare(inputPassword, hashedPassword);