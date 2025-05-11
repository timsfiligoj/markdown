import "./globals.css";
import { AuthProvider } from "../lib/contexts/AuthContext";

export const metadata = {
  title: "Deep Research",
  description: "A visual deep research tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
