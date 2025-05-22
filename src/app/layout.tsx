import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import ClientBody from "./ClientBody";

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['500', '600', '700', '800'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pnyxinstitute.com'), // Update with actual domain when deployed
  title: {
    default: "Pnyx Institute - Empowering Future Innovators",
    template: "%s | Pnyx Institute"
  },
  description: "Join Pnyx Institute to gain cutting-edge skills in blockchain, web3, and decentralized technologies through innovative courses and expert-led bootcamps.",
  keywords: ["blockchain education", "web3 courses", "crypto learning", "decentralized technology", "blockchain bootcamp", "smart contract development"],
  authors: [{ name: "Pnyx Institute Team" }],
  creator: "Pnyx Institute",
  publisher: "Pnyx Institute",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: [
      { url: '/phoenix-logo.svg', sizes: 'any' }
    ],
    apple: [
      { url: '/phoenix-logo.svg' }
    ],
    shortcut: ['/phoenix-logo.svg'],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.pnyxinstitute.com",
    siteName: "Pnyx Institute",
    title: "Pnyx Institute - Empowering Future Innovators in Blockchain & Web3",
    description: "Gain cutting-edge skills in blockchain and decentralized technologies through Pnyx Institute's innovative courses and expert-led bootcamps.",
    images: [{ 
      url: "/og-image.jpg", 
      width: 1200, 
      height: 630,
      alt: "Pnyx Institute - Blockchain Education Platform"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pnyx Institute - Blockchain & Web3 Education",
    description: "Gain cutting-edge skills in blockchain and decentralized technologies through Pnyx Institute's innovative courses.",
    site: "@PnyxInstitute",
    creator: "@PnyxInstitute",
    images: ["/twitter-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
    yandex: "yandex-verification-code", // Replace with actual verification code
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add your analytics tracking scripts here (e.g., Google Analytics, Plausible) */}
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased flex flex-col",
        inter.variable,
        poppins.variable
      )}>
        <ClientBody>
          <Header />
          <main className="flex-grow w-full overflow-x-hidden">{children}</main>
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}
