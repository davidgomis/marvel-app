import axios from "axios";
import { baseURL, getAuthParams } from "./config";
import { CharacterDetailProps, CharacterProps } from "./marvelApi";

interface MarvelResponse<T> {
  data: { results: T[] };
}

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
  try {
    const response = await axios.get<MarvelResponse<CharacterDetailProps>>(
      `${baseURL}/characters/${id}?${getAuthParams()}`
    );

    const character = response.data.data.results[0];
    return character || null;
  } catch (error) {
    console.error(`Error obteniendo el personaje con ID ${id}:`, error);
    return null;
  }
};
