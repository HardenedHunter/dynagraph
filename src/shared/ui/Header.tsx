import clsx from "clsx";

export const Header: FCC = ({ className }) => (
  <header
    className={clsx(
      className,
      "flex h-16 items-center justify-center border-b-2 border-neutral-800 px-6",
    )}
  >
    <section className="max-w-[90rem] grow">
      <h1 className="text-xl font-bold md:text-3xl">
        Dyna<span className="text-violet-600">graph</span>
      </h1>
    </section>
  </header>
);
