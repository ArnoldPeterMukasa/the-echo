
import "./globals.css";
import Header from "../components/Header";
export const metadata={
  title: "The-Echo",
  description: "Echoing Reality of Thousands...",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
