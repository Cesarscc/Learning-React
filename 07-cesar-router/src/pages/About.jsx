import { Link } from "../Link";

const i18n = {
  es: {
    title: "Sobre Nosotros",
    button: "Ir al Home",
    description:
      "Hola me llamo César Colorado y estoy creando un React Router.",
  },
  en: {
    title: "Abot ut",
    button: "Go to Home page",
    description:
      "Hello, my name is César Colorado and I am creating a React Router.",
  },
};

const useI18n = (lang) => {
  return i18n[lang] || i18n.en;
};

export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? "es");

  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img
          src="https://pbs.twimg.com/profile_images/1730607351781117952/N97efvUT_400x400.jpg"
          alt="Foto de Cesarscc"
          width={250}
          height={250}
        />
        <p>{i18n.description}</p>
      </div>
      <Link to={"/"}>{i18n.button}</Link>
    </>
  );
}
