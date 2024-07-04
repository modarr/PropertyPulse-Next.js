import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
export const metadata = {
  title: "PropertyPulse | Find Perfect Rental",
  description: "Find your dream property",
  keywords: "rental , find rentals, find properties",
};

const mainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
};

export default mainLayout;
