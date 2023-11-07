import { Widget } from "./Widget";

export const ErrorWidget: FCC = () => {
  return (
    <Widget className="flex flex-col items-center justify-center gap-4">
      <p className="text-red-500">Failed to load widget</p>
    </Widget>
  );
};
