export type CreateUserData = {
  name: string;
  lastName: string;
  dni: string;
  email: string;
  birthday: Date | null;
  passwordHash: string;
};
