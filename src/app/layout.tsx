import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import { Toaster, toast } from 'sonner'

const lato = Lato({
  weight: ["400"],
  subsets: ["latin"], // Specify the subsets here
});

export const metadata: Metadata = {
  title: {
    default:"NoteWise",
    template:"%s - NoteWise"
  },
  description: "Interact with Your Notes Like Never Before. Organize, Discuss, and Enhance Your Ideas Seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(' bg-Bgwhite text-DarkPurple flex flex-col min-h-screen',lato.className)}>
      <Toaster position="top-center" />
      <main>
        {children}
      </main>
      </body>
    </html>
  );
}
