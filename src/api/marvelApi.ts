import axios from "axios";
import { baseURL, getAuthParams } from "./config";

export interface CharacterProps {
  id: string;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description?: string;
  isDetail?: boolean;
}

export interface CharacterDetailProps extends CharacterProps {
  comics: {
    available: number;
    items: { resourceURI: string; name: string }[];
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

export const getCharactersByName = async (
  name: string
): Promise<CharacterProps[]> => {
  try {
    const response = await axios.get<MarvelResponse<CharacterProps>>(
      `${baseURL}/characters?nameStartsWith=${name}&limit=50&${getAuthParams()}`
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error buscando personajes:", error);
    return [];
  }
};

export const getCharacterById = async (
  id: string
): Promise<CharacterDetailProps | null> => {
  const CACHE_KEY = `marvelCharacter_${id}`;
  const cachedData = localStorage.getItem(CACHE_KEY);

  if (cachedData) {
    const cacheData = JSON.parse(cachedData);
    if (Date.now() - cacheData.timestamp < CACHE_DURATION) {
      return cacheData.data;
    } else {
      localStorage.removeItem(CACHE_KEY);
    }
  }

  try {
    const response = await axios.get<MarvelResponse<CharacterDetailProps>>(
      `${baseURL}/characters/${id}?${getAuthParams()}`
    );
    const character = response.data.data.results[0] || null;

    if (character) {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: character, timestamp: Date.now() })
      );
    }

    return character;
  } catch (error) {
    console.error(`Error obteniendo el personaje con ID ${id}:`, error);
    return null;
  }
};

export const getComicsByIds = async (comicIds: string[]) => {
  const cachedComics: string[] = [];
  const missingComicIds: string[] = [];

  comicIds.forEach((comicId) => {
    const cacheKey = `marvelComic_${comicId}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const cacheData = JSON.parse(cachedData);
      if (Date.now() - cacheData.timestamp < CACHE_DURATION) {
        cachedComics.push(cacheData.data);
      } else {
        localStorage.removeItem(cacheKey);
        missingComicIds.push(comicId);
      }
    } else {
      missingComicIds.push(comicId);
    }
  });

  try {
    const comicPromises = missingComicIds.map(async (comicId) => {
      const comicUrl = `${baseURL}/comics/${comicId}?${getAuthParams()}`;
      const response = await axios.get(comicUrl);
      const comic = response.data.data.results[0];

      if (comic) {
        localStorage.setItem(
          `marvelComic_${comicId}`,
          JSON.stringify({ data: comic, timestamp: Date.now() })
        );
      }

      return comic;
    });

    const fetchedComics = await Promise.all(comicPromises);
    return [...cachedComics, ...fetchedComics];
  } catch (error) {
    console.error("Error fetching comics:", error);
    return cachedComics;
  }
};
