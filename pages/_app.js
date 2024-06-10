import { UserProvider } from './context/UserContext';
import Navbar from '../components/Navbar';
import Chatbot from '../components/Chatbot';
import FooterTest from '../components/footer/FooterTest';
import { useRouter } from 'next/router';
import FooterTest from "../components/ui/footer/footerTest"

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
