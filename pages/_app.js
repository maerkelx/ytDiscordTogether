import '@/styles/globals.css';
import { DiscordContextProvider } from '@/util/DcContext';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
