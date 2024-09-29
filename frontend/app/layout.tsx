import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from "@/context/theme.context-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "./components/Navbar";
import { StoreProvider } from "@/state/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkySight",
  description: "Your job application tracker",
  icons: {
    icon: '/dove.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black bg-white `}>
        <StoreProvider>
          <SessionProvider session={session}>
            <ThemeContextProvider>
              <Navbar />
              {children}
            </ThemeContextProvider>
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

// ** Notes: **
//!! Errors fixed:
// - Hydration error was being caused by multiple instances of the Navbar component being rendered in the layout.tsx file. This was fixed by removing the
// html and body tags from the dashboard layout.tsx file  and placing them in the main layout.tsx file.

// Button on navbar wouldnt take in a on click method within a server side rendered component.
// This was fixed by creating a new component called Logout.tsx and importing it into the Navbar component.
// ... making the logout button a client side rendered component and having the on click functionality within the Logout.tsx file. Then importing the Logout.tsx file into the Navbar component.

// ** Updates: **
// - User is able to log in with google and github and be redirected to the home page
// - User is able to log out and be redirected to the landing page
// - User image and name is displayed on the navbar

// - User is able to log in with email and password and be redirected to the home page
// - User is able to register with email and password and be redirected to the login page

// - Each User is able to view their job applications on the dashboard

// ** Next Steps: **
// todo - Optimization of the code
// todo - Links for each job application to view more details
// -- Rerender should be optimized when user adds or deletes a job application
// ? userReducer

// !! Needs:
// ?? Redux?? to manage state and help with rerendering

// ** The need for redux is so when users add or delete a job application,
// ** we use the redux store to rerender the dashboard page with the updated job applications.
// ** But we will still post the new updates to the database.
// ** This will help with the optimization of the code and the rerendering of the page.
