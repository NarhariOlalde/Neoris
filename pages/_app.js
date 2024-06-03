import Navbar from "../components/Navbar";
import "../styles/globals.css";
import Chatbot from "../components/Chatbot";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith('/admin');

  return (
    <>
      {!isDashboard && <Navbar />}
      {!isDashboard && <Chatbot />}
      <Component {...pageProps} />
    </>
  );
}
 