import { useEffect, useState } from "react";
import { getComicsByIds } from "@api/marvelApi";

interface ComicThumbnail {
  path: string;
  extension: string;
}

interface ComicDate {
  type: string;
  date: string;
}

interface Comic {
  resourceURI: string;
  title: string;
  thumbnail: ComicThumbnail;
  dates: Array<{ type: string; date: string }>;
}

export const useComics = (comicItems: { resourceURI: string }[]) => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!comicItems || comicItems.length === 0) {
      setLoading(false);
      return;
    }

    const fetchComics = async () => {
      try {
        const comicIds = comicItems
          .map((item) => item.resourceURI.split("/").pop())
          .filter((id): id is string => id !== undefined);

        const fetchedComics = await getComicsByIds(comicIds);

        const comicsWithDate = fetchedComics.map((comic) => {
          const onSaleDate =
            comic.dates.find((date: ComicDate) => date.type === "onsaleDate")
              ?.date || null;

          return {
            ...comic,
            date: onSaleDate,
          };
        });

        setComics(comicsWithDate);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Error fetching comics");
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [comicItems]);

  return { comics, loading, error };
};
