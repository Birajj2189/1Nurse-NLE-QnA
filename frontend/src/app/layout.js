import { Inter } from 'next/font/google'
import '@/app/globals.css'
import 'bootstrap/dist/css/bootstrap.css';

import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/Navbar";
import BootstrapClient from "@/components/BootstrapClient";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ['latin'] })
import { AuthProvider } from '@/components/authContext';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <AuthProvider>
      <body className={inter.className}>
            <Navbar/>
            <Sidebar/>
          {children}
      <BootstrapClient/>
      </body>
    </AuthProvider>
    </html>
  )
}
