import clsx from "clsx";

import { Header } from "./Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: FCC<MainLayoutProps> = ({ className, children }) => (
  <main className="flex h-screen flex-col">
    <Header />
    <section className={clsx(className, "basis-full")}>{children}</section>
  </main>
);
