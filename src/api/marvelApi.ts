import axios from "axios";
import md5 from "md5";

const publicKey = "bb98967144f9ce338fbe4b3970e03090";
const privateKey = "c000440119ca2f95f3a4e92b0367b22ceee779d1";
const baseURL = "https://gateway.marvel.com/v1/public";

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface MarvelResponse<T> {
  data: { results: T[] };
}

const getAuthParams = (): string => {
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);
  return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
};

export const getCharacters = async (): Promise<Character[]> => {
  const cacheKey = "marvelCharacters";
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const cacheData = JSON.parse(cachedData);
    const cacheAge = Date.now() - cacheData.timestamp;

    if (cacheAge < 86400000) {
      return cacheData.data;
    } else {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const response = await axios.get<MarvelResponse<Character>>(
      `${baseURL}/characters?limit=50&${getAuthParams()}`
    );
    const characters = response.data.data.results;

    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data: characters, timestamp: Date.now() })
    );

    return characters;
  } catch (error) {
    console.error("Error obteniendo los personajes:", error);
    return [];
  }
};
