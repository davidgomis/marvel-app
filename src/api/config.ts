import md5 from "md5";

const publicKey = "bb98967144f9ce338fbe4b3970e03090";
const privateKey = "c000440119ca2f95f3a4e92b0367b22ceee779d1";

export const baseURL = "https://gateway.marvel.com/v1/public";

export const getAuthParams = (): string => {
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);
  return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
};
