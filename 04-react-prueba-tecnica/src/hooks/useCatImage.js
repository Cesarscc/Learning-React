import { useEffect, useState } from "react";

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;

    const threeFirstWords = fact.split(" ", 3).join(" ");
    setImageUrl(
      `https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red`
    );
  }, [fact]);

  return { imageUrl: `${imageUrl}` };
}
