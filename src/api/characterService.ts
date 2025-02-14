import axios from "axios";
import { baseURL, getAuthParams } from "./config";
import { CharacterProps } from "./marvelApi";

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
