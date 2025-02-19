import { useParams } from "react-router-dom";
import { useCharacter } from "@hooks/useCharacter";
import { useComics } from "@hooks/useComics";
import { Character } from "@components/Character";
import { Spinner } from "@components/Spinner";

import "./characterDetail.scss";

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { character, loading } = useCharacter(id);
  const { comics } = useComics(character?.comics.items || []);

  if (loading) return <Spinner />;
  if (!character) return <p>Character not found</p>;

  return (
    <div className="character-detail">
      <Character
        id={character.id}
        name={character.name}
        thumbnail={character.thumbnail}
        description={
          character.description ?? "This character has no description"
        }
        isDetail
      />
      {comics.length > 0 ? (
        <div className="character-detail__comics">
          <div className="character-detail__comics__container">
            <h1>Comics</h1>
            <ul className="character-detail__comics-list">
              {comics.map((comic) => (
                <li key={comic.title}>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <div className="character-detail__comics-list__info">
                    <p>{comic.title}</p>
                    {comic.dates
                      .filter((date) => date.type === "onsaleDate")
                      .map((onsaleDate, index) => (
                        <span key={index}>
                          {new Date(onsaleDate.date).getFullYear()}
                        </span>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Spinner text="Searching comics..." />
      )}
    </div>
  );
};
