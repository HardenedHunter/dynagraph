import { Header } from "./Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <main>
    <Header />
    <section className="p-6">{children}</section>
  </main>
);
