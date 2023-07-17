import { cssBundleHref } from "@remix-run/css-bundle";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import styles from './styles/main.css'
import MainNavigation from "./components/MainNavigation";

// export const links = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation/>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


export const ErrorBoundary = ({error}) => {
  const routeError = useRouteError();
  const message = routeError.message || 'Oops! Something went wrong.';

  if (isRouteErrorResponse(routeError)) { //<--Prueba
  return(
    <html lang="en">
    <head>
      <Meta />
      <Links />
      <title>{routeError.statusText}</title>
    </head>
    <body>
      <header>
        <MainNavigation/>
      </header>
      <main className="error">
      <h1>{routeError.statusText}</h1>
      <p>{routeError.data?.message || 'Something went wrong!'}</p>
      <p>Back to <Link to="/">safety</Link>!</p>
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
    </html>
  );
}

return (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
      <title>An error occurred!</title>
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>
      <main className="error">
        <h1>An error occurred</h1>
        <p>{message}</p>
        <p>
          Back to <Link to="/">safety</Link>!
        </p>
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

};

export const links = () => [
  ...(cssBundleHref
    ? [{ rel: 'stylesheet', href: cssBundleHref }]
    : [{ rel: 'stylesheet', href: styles }]),
];

// export function links() {
//   return [{rel: 'stylesheet', href: styles}]
// }