import Navbar from "../components/navigation/navbar/Navbar";
import "../styles/globals.css";
import Chatbot from "../components/ui/chatbot/Chatbot";
import { useRouter } from 'next/router';
import FooterTest from "../components/ui/footer/footerTest"

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith('/admin');

  return (
    <>
      {!isDashboard && <Navbar />}
      {!isDashboard && <Chatbot />}
      <Component {...pageProps} />
      <div style={{ backgroundColor: "#1C1C1C", width: "100%"}}>
        <FooterTest />
      </div>
    </>
  );
}
 