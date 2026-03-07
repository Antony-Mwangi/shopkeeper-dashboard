// import "./globals.css";
// import type { Metadata } from "next";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// export const metadata: Metadata = {
//   title: "Shop Management System",
//   description: "Simple production-ready shop management system",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-50 min-h-screen flex flex-col">
//         <Header />
//         <main className="flex-grow">
//           {children}
//         </main>
//         <Footer />
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shop Management System",
  description: "Simple production-ready shop management system",
};

export default async function RootLayout({  // Add async here
  children,
}: {
  children: React.ReactNode;
}) {
  // Await the headers
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  
  // Check if current route is dashboard (hide footer on dashboard pages)
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        {/* Only show Footer on non-dashboard pages */}
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}