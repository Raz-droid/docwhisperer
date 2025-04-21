import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider,SignUpButton,SignedOut} from "@clerk/nextjs"
import { Button } from "@/components/ui/button";

import Providers from "@/components/ui/Providers";
import {Toaster} from "react-hot-toast"
 
const geistSans = Geist({ 
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
  

export const metadata: Metadata = {
  title: "SmartAIreader",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SignedOut>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          
          
                <SignUpButton mode="modal">
                  <div>
                    <Button asChild className="w-20 h-10 hover:bg-teal-600 transition cursor-pointer">
                      <span className="flex items-center justify-center">
                        Sign Up
                        
                      </span>
                    </Button>
                  </div>
                </SignUpButton>
          
          
        </header>
        </SignedOut>
        {children}
        <Toaster/>
      </body>
    
    </html>
   
      </Providers>
    
  </ClerkProvider>
  );
}
