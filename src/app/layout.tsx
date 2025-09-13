// import { Manrope } from "next/font/google";
// import "./globals.css";
// import Header from "@/app/components/Layout/Header";
// import Footer from "@/app/components/Layout/Footer";
// import { ThemeProvider } from "next-themes";
// import ScrollToTop from "@/app/components/ScrollToTop";
// import SessionProviderComp from "@/app/provider/nextauth/SessionProvider";
// import { AuthDialogProvider } from "../context/AuthDialogContext";
// import NextTopLoader from "nextjs-toploader";
// const manrope = Manrope({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
//   session,
// }: Readonly<{
//   children: React.ReactNode;
//   session: any;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={manrope.className}>
//         <NextTopLoader color="#EE7B11" />
//         <AuthDialogProvider>
//           <SessionProviderComp session={session}>
//             <ThemeProvider
//               attribute="class"
//               enableSystem={false}
//               defaultTheme="light"
//             >
//               <Header />
//               {children}
//               <Footer />
//               <ScrollToTop />
//             </ThemeProvider>
//           </SessionProviderComp>
//         </AuthDialogProvider>
//       </body>
//     </html>
//   );
// }

"use client";

import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Layout/Header";
import Footer from "@/app/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/app/components/ScrollToTop";
import SessionProviderComp from "@/app/provider/nextauth/SessionProvider";
import { AuthDialogProvider } from "../context/AuthDialogContext";
import NextTopLoader from "nextjs-toploader";
import { useSession } from "next-auth/react";

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <NextTopLoader color="#EE7B11" />
        <AuthDialogProvider>
          <SessionProviderComp session={session}>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              <ConditionalLayout>{children}</ConditionalLayout>
              <ScrollToTop />
            </ThemeProvider>
          </SessionProviderComp>
        </AuthDialogProvider>
      </body>
    </html>
  );
}

// ✅ Separate component to access session
function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  // Always render Header and Footer, but Header will handle admin-specific rendering internally
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
