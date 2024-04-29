import Navbar from "../components/Navbar";
import "../styles/globals.css";
import Chatbot from "../components/Chatbot";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Chatbot />
    
      <Component {...pageProps} />
    </>
  );
}
