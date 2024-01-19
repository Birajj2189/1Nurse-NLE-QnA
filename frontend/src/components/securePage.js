// pages/secure-page.js
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/components/auth';
import dynamic from 'next/dynamic';

const Body = dynamic(() => import('@/components/Body'), { ssr: false });

const SecurePage = ({ req }) => {
    const router = useRouter();

    // Server-side logic using useEffect
    useEffect(() => {
        // Server-side logic goes here, if needed
    }, [req]);

    // Client-side logic directly in the component
    const handleClientSideLogic = () => {
        // Redirect to login page if not authenticated
        if (!isAuthenticated(req)) {
            router.push('/login');
        }
    };

    useEffect(() => {
        // Perform client-side logic on mount
        handleClientSideLogic();
    }, [router, req]);

    return (
        <div>
            <h1>Secure Page</h1>
            <Body req={req} />
            {/* Your secure page content */}
        </div>
    );
};

export const getServerSideProps = async ({ req }) => {
    // Pass the `req` parameter to the component to handle server-side authentication
    return {
        props: { req },
    };
};

export default SecurePage;
