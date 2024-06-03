import { FC } from "react";
import Link from "next/link";

import { Icon, Panel } from "~/shared/ui";

export const CreateWidgetPanel: FC = () => {
  return (
    <Link href="/library/create">
      <Panel className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 hover:bg-neutral-100">
        <Icon icon="plus" />
        <p>Создать виджет</p>
      </Panel>
    </Link>
  );
};
