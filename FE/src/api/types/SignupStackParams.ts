export type SignupStackParams = {
  Name: undefined;
  PhoneNum: { name: string };
  Email: { name: string; phone: string };
  Password: { name: string; phone: string; email: string };
  Nickname: { name: string; phone: string; email: string; password: string };
};
