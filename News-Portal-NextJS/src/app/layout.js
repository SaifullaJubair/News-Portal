import localFont from "next/font/local";
import "./globals.css";
import QueryProviders from "@/provider/QueryProviders";
import { Slide, ToastContainer } from "react-toastify";
import SettingProvider from "@/provider/SettingProvider";
import AuthProvider from "@/provider/AuthProvider";
// import AuthProvider from "@/provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       className="antialiased"  
      >
        <AuthProvider>
          <SettingProvider>
            <QueryProviders>
              <main>
                {children}
                <ToastContainer
                  position="bottom-right"
                  autoClose={1500}
                  transition={Slide}
                  closeOnClick
                />
              </main>
            </QueryProviders>
          </SettingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
