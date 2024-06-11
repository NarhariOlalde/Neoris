// hoc/withAdminAuth.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAdminAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAdminAuth = async () => {
        const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userId : null;
        if (!userId) {
          router.push('/login'); // Redirect to login page if user is not authenticated
          return;
        }

        try {
          const response = await axios.get(`/api/admin/${userId}`);
          const isAdmin = response.data.isAdmin;
          if (!isAdmin) {
            router.push('/login'); // Redirect to login page if user is not an admin
          }
        } catch (error) {
          console.error('Error checking admin authentication:', error);
          router.push('/login'); // Redirect to login page if there's an error
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
