import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';
import 'styles/App.scss';

export default function App({ Component, pageProps }) {
  Router.onRouteChangeComplete = () => {
    setTimeout(() => {
      if (location.hash) {
        location = location;
      }
    }, 500);
  };
  return (
    <PageTransition timeout={300} classNames="page-transition">
      <Component {...pageProps} />
    </PageTransition>
  )
}
