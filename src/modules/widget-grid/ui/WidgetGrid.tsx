import clsx from "clsx";
import { useUnit } from "effector-react";
import { MDXRemote } from "next-mdx-remote";

import { Widget, ErrorWidget } from "~/entities/widget";
import { WidgetContext } from "./WidgetContext";
import { model } from "../model";

export const WidgetGrid: FCC = ({ className }) => {
  const widgets = useUnit(model.$widgets);

  return (
    <section className={clsx(className, "flex flex-wrap gap-6")}>
      {widgets.map(({ id, mdxSource, error }, index) => (
        <WidgetContext.Provider key={id} value={{ id }}>
          {mdxSource ? (
            <MDXRemote {...mdxSource} components={{ Widget }} />
          ) : (
            <ErrorWidget key={index} error={error} />
          )}
        </WidgetContext.Provider>
      ))}
    </section>
  );
};
