import { Inter } from "next/font/google";
import "./globals.css";
import { BotConnector } from "@/components/bot";
// import { Providers } from "./Providers";
// import { Toaster } from "sonner";
import { UserConnector } from "@/components/Connectors";
import { Render } from "./Render";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className={clsx(inter.className)}>
        {/* <Providers> */}
        <BotConnector />
        <div className="flex flex-col items-center w-full h-screen">
          {children}

          <UserConnector />
          {/* <Render children={children} /> */}
        </div>

        {/* {children} */}

        {/* <Toaster position="top-center" richColors /> */}
        {/* </Providers> */}

        <Toaster />
      </body>
    </html>
  );
}
