import { UserProvider } from './context/UserContext';
import Navbar from '../components/navigation/navbar/Navbar';
import Chatbot from '../components/ui/chatbot/Chatbot';
import { useRouter } from 'next/router';
import "../styles/globals.css";
import FooterTest from "../components/ui/footer/footerTest"
import Services from '../components/ui/Services/Services';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const isDashboard = router.pathname.startsWith('/admin');

    return (
        <UserProvider>

            {!isDashboard && <Navbar />}
            {!isDashboard && <Chatbot />}
            <Component {...pageProps} />
            <div style={{ backgroundColor: "#1C1C1C", width: "100%" }}>
                <FooterTest />
            </div>
        </UserProvider>
    );
}
