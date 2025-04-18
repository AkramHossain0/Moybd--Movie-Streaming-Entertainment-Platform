
'use client';

import React, { useEffect, useState } from 'react';

function LoadingSpinner() {
    return (
        <div className="relative w-16 h-16">
            <div className="absolute w-16 h-16 border-4 rounded-full border-red-500/20"></div>
            <div className="absolute w-16 h-16 border-4 border-transparent rounded-full border-t-red-500 animate-spin"></div>
            <div className="absolute w-16 h-16 border-4 border-transparent rounded-full border-l-red-600 animate-pulse"></div>
        </div>
    );
}


function Loading() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black">
                <LoadingSpinner />
                <div className="mt-8 space-y-2 text-center">
                    <div className="text-2xl font-bold tracking-wider text-red-500 animate-pulse">
                        LOADING
                    </div>
                    <div className="text-sm tracking-widest text-red-700/70">
                        Please wait...
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900/0 via-red-500 to-red-900/0"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-900/0 via-red-500 to-red-900/0"></div>
                <div className="absolute w-24 h-24 rounded-full top-4 left-4 bg-red-500/5 blur-xl"></div>
                <div className="absolute w-32 h-32 rounded-full bottom-4 right-4 bg-red-500/5 blur-xl"></div>
            </div>
        );
    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-2xl">Content Loaded!</p>
            </div>
        </>
    )
}

export default Loading
