"use client";

import Header from "./dashboard/components/Header";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/lib/fontawesome/css/all.min.css";

const AdminLayout = ({ children }) => {
    return (
        <html>
            <body data-bs-theme="dark">
                <SessionProvider>
                    <Header />
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
};

export default AdminLayout;
