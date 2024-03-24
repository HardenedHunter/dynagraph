import { FC, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

type NavLinkProps = PropsWithChildren<{
  href: string;
}>;

const NavLink: FC<NavLinkProps> = ({ children, href }) => {
  const { asPath } = useRouter();

  const isActive = asPath.startsWith(href);

  return (
    <Link href={href}>
      <p
        className={clsx(
          "rounded px-4 py-2 hover:text-neutral-900 hover:underline",
          isActive && "bg-neutral-200 text-neutral-900",
        )}
      >
        {children}
      </p>
    </Link>
  );
};

export const Header: FCC = ({ className }) => (
  <header
    className={clsx(
      className,
      "flex h-16 items-center justify-center border-b-[1px] border-neutral-300 bg-neutral-50 px-6",
    )}
  >
    <section className="flex max-w-[90rem] grow items-center gap-8">
      <Link href="/">
        <h1 className="text-xl font-bold md:text-3xl">
          Dyna<span className="text-violet-500">graph</span>
        </h1>
      </Link>
      <nav>
        <ul className="flex gap-2">
          <li>
            <NavLink href="/dashboards">Dashboards</NavLink>
          </li>
          <li>
            <NavLink href="/library">Library</NavLink>
          </li>
        </ul>
      </nav>
    </section>
  </header>
);
