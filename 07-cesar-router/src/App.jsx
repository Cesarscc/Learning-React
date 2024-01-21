import { Suspense, lazy } from "react";
import "./App.css";
import { Router } from "./Router";
import Page404 from "./pages/404";
import SearchPage from "./pages/Search";
import { Route } from "./Route";

const LazyHomePage = lazy(() => import("./pages/Home"));
const LazyAboutPage = lazy(() => import("./pages/About"));

const appRoutes = [
  {
    path: "/:lang/about",
    Component: LazyAboutPage,
  },
  {
    path: "/search/:query",
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path={"/"} Component={LazyHomePage} />
          <Route path={"/about"} Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
