'use client';

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </>
    );
};
export default Layout