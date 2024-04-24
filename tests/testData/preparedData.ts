type Cookies = {
  name: string;
  value: string;
  url?: string | undefined;
  domain: string | undefined;
  path: string | undefined;
  expires: number | undefined;
  httpOnly: boolean | undefined;
  secure: boolean | undefined;
  sameSite: "None";
};

export const cookieForStandartUser: Cookies = {
  name: "session-username",
  value: process.env.USERNAME_STANDART || "",
  domain: "www.saucedemo.com",
  path: "/",
  expires: 9709547505,
  httpOnly: false,
  secure: true,
  sameSite: "None",
};
