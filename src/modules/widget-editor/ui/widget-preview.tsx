import { useUnit } from "effector-react";
import clsx from "clsx";

import { Panel } from "~/shared/ui";
import { Widget } from "~/entities/widget";
import { editorModel } from "../model";

export const WidgetPreview: FCC = ({ className }) => {
  const serialized = useUnit(editorModel.$serialized);

  return (
    <Panel
      className={clsx(
        "aspect-[21/9]",
        !serialized && "bg-violet-200",
        className,
      )}
    >
      {!serialized && (
        <div className="flex h-full w-full items-center justify-center text-center">
          <p>
            Добавьте код и нажмите &quot;Выполнить&quot;,
            <br />
            чтобы активировать предпросмотр
          </p>
        </div>
      )}
      {serialized && <Widget serialized={serialized} />}
    </Panel>
  );
};
