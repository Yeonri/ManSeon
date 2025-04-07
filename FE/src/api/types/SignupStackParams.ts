export type SignupStackParams = {
  Name: undefined;
  PhoneNum: { username: string };
  Email: { username: string; phone: string };
  Password: { username: string; phone: string; email: string };
  Nickname: { email: string };
};
