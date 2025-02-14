import axios from "axios";
import { baseURL, getAuthParams } from "./config";

export interface CharacterProps {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface MarvelResponse<T> {
  data: { results: T[] };
}

const CACHE_KEY = "marvelCharacters";
const CACHE_DURATION = 86400000;

export const getCharacters = async (): Promise<CharacterProps[]> => {
  const cachedData = localStorage.getItem(CACHE_KEY);

  if (cachedData) {
    const cacheData = JSON.parse(cachedData);
    const cacheAge = Date.now() - cacheData.timestamp;

    if (cacheAge < CACHE_DURATION) {
      return cacheData.data;
    } else {
      localStorage.removeItem(CACHE_KEY);
    }
  }

  try {
    const response = await axios.get<MarvelResponse<CharacterProps>>(
      `${baseURL}/characters?limit=50&${getAuthParams()}`
    );
    const characters = response.data.data.results;

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: characters, timestamp: Date.now() })
    );

    return characters;
  } catch (error) {
    console.error("Error obteniendo los personajes:", error);
    return [];
  }
};
