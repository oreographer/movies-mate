import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";

import { Lato } from "next/font/google";

const font = Lato({ weight: ["400", "700"], subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={font.className}>
      <Navbar />

      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>

      <Footer />
    </div>
  );
}
