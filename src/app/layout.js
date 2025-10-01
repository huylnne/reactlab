"use client";

import { usePathname } from "next/navigation";  
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "antd/dist/reset.css";
import ReduxProvider from "./redux-provider";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "./layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          {isLoginPage ? (
           //Chi trang login thi se k co header va sidebar
            <div>{children}</div>
          ) : (
            
            <div className={styles.appWrapper}>
             
              <div className={styles.headerWrapper}>
                <Header />
              </div>

              
              <div className={styles.bodyWrapper}>
                <Sidebar />
                <main className={styles.contentWrapper}>{children}</main>
              </div>
            </div>
          )}
        </ReduxProvider>
      </body>
    </html>
  );
}
