import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen">
      <div className="w-[640px] mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
