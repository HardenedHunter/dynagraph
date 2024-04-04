import clsx from "clsx";

import { Header } from "./Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: FCC<MainLayoutProps> = ({ className, children }) => (
  <main className="flex h-screen flex-col">
    <Header className="shrink-0" />
    <section className={clsx(className, "basis-full")}>{children}</section>
  </main>
);
