import { FC, useEffect, useState } from "react";
import { Character, getCharacters } from "@api/marvelApi";

export const Home: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
    };
    fetchData();
  }, []);
  return (
    <div className="home">
      <ul>
        {characters.map((char) => (
          <li key={char.id}>
            <img
              src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
              alt={char.name}
              width={100}
            />
            <p>{char.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
