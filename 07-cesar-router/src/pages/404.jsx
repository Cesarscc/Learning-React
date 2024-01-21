import { Link } from "../Link";

export default function Page404() {
  return (
    <>
      <div>
        <h1>This is NOT fine</h1>
        <img
          src="https://midu.dev/images/this-is-fine-404.gif"
          alt="Gif del perro de This is Fine quemándose vivo"
        />
        <br />
        <Link to="/">Volver al Home</Link>
      </div>
    </>
  );
}
