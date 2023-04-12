import Cookies from "universal-cookie";

export const authCookie = async () => {
  const cookies = new Cookies();
  const cookie = cookies.get(process.env.NEXT_PUBLIC_LUJAN_EN_5_KEY);
  return cookie;
};
