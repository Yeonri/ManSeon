export type User = {
  socialId: string;
  provider: string;
  role: "USER" | "ADMIN";
};
