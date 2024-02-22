import { FromLanguage, Language } from "../types.d";

const apiKey = import.meta.env.VITE_CLAVE_DE_API_DE_DEEPL as string;
const port = import.meta.env.VITE_MI_PORT as unknown as number;

export const translateText = async (
  inputText: string,
  fromLanguage: FromLanguage,
  toLanguage: Language
) => {
  try {
    const response = await fetch(`http://localhost:${port}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `DeepL-Auth-Key ${apiKey}`,
      },
      body: JSON.stringify({
        text: [inputText],
        source_lang: fromLanguage,
        target_lang: toLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al traducir translate.ts");
    }

    const result = await response.json();
    return result.translations[0].text;
  } catch (error) {
    console.error("Error al traducir:", error);
  }
};
