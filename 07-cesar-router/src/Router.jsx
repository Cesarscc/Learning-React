import { useEffect, useState, Children } from "react";
import { EVENTS } from "./const";
import { match } from "path-to-regexp";
import { getCurrentPath } from "./utils";

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);

    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  // add routes from children <Route/> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === "Route";

    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) {
      return true;
    }

    //hemos usado path-to-regexp
    //para poder detectar rutas dinamicas como por ejm
    // search/:query <- :query es una ruta dinamica

    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) {
      return false;
    }
    //guardar los parámetros de la url que eran dinámicos
    //y que hemos extraído con path-to-regexp
    //por ejm, si la ruta es /search/:query
    //y la urla es /search/javascript
    //matched.paramas.query === 'javascript'

    // /search/:query
    routeParams = matched.params; //{query: 'javascript'} || /search/javascript
    return true;
  })?.Component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
