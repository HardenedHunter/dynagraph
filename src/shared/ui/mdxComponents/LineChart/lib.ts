import { useState } from "react";

export const useYAxisWidth = () => {
  const [width, setWidth] = useState(1);

  const ref = (ref: { container?: HTMLElement | undefined } | null) => {
    const container = ref?.container;

    if (!container) return;

    const yAxis = container.querySelector(".yAxis");

    if (yAxis) {
      setWidth(yAxis.getBoundingClientRect().width);
    }
  };

  return { width, ref };
};
