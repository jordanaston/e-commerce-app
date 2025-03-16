import { ReactNode } from "react";
import Navbar from "./navigation/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-grey-100">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
