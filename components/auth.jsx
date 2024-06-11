import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5005/api/', // Set your base URL here
  });

const withAdminAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAdminAuth = async () => {
        const storedUser = localStorage.getItem('user');
        let userId; // Declare userId here

        console.log('Stored user:', storedUser);

        if (storedUser) {
          try {
            const userObject = JSON.parse(storedUser);
            userId = userObject.userId; // Extract userId from parsed JSON
            console.log('User ID:', userId);

            if (!userId) {
              router.push('/');
              
              return;
            }

            const response = await api.get(`check-admin/${userId}`);
            const isAdmin = response.data.isAdmin;
            if (!isAdmin) {
              router.push('/');
            }
          } catch (error) {
            console.error('Error checking admin authentication:', error);
            router.push('/');
          }
        } else {
          console.log("Stored user is null or empty.");
          router.push('/l');
        }
      };

      checkAdminAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    if (WrappedComponent.getInitialProps) {
      return WrappedComponent.getInitialProps(ctx);
    }
    return {};
  };

  return Wrapper;
};

export default withAdminAuth;
