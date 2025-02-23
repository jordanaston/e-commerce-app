import { ReactNode } from "react";
import Navbar from "./navigation/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-background">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;