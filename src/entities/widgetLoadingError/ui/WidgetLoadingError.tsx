import { Button } from "~/shared/ui";
import { widgetLoadingErrorModal } from "./WidgetLoadingErrorModal";

type WidgetLoadingErrorProps = {
  error: string;
};

export const WidgetLoadingError: FCC<WidgetLoadingErrorProps> = ({ error }) => {
  const handleClick = () => {
    widgetLoadingErrorModal.open({ error });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <p className="text-red-500">Failed to load widget</p>
      <Button
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        variant="secondary"
        onClick={handleClick}
      >
        View stack trace
      </Button>
    </div>
  );
};
