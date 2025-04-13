import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider,SignInButton,SignUpButton,SignedIn,SignedOut,UserButton} from "@clerk/nextjs"
import { Button, buttonVariants } from "@/components/ui/button";
import {LogIn} from "lucide-react"

const geistSans = Geist({ 
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
  

export const metadata: Metadata = {
  title: "Chat-pdf",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
          
                <SignUpButton mode="modal">
                  <div>
                    <Button asChild className="w-20 h-10 hover:bg-teal-600 transition cursor-pointer">
                      <span className="flex items-center justify-center">
                        Sign Up
                        
                      </span>
                    </Button>
                  </div>
                </SignUpButton>
          </SignedOut>
          
        </header>
        {children}
      </body>
    </html>
  </ClerkProvider>
  );
}
