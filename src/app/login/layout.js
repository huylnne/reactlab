"use client";
import ReduxProvider from "../redux-provider";
import "../globals.css";

export default function LoginLayout({ children }) {
  return (
        <ReduxProvider>
          {children}
        </ReduxProvider>
      
    
  );
}
