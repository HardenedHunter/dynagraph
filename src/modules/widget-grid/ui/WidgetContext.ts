import React from "react";

type WidgetContextData = {
  id: string;
};

export const WidgetContext = React.createContext<WidgetContextData | null>(
  null,
);

export const useWidgetContext = () => {
  const context = React.useContext(WidgetContext);

  if (!context) {
    throw new Error(
      "Widget component must be rendered as a child of WidgetContext.Provider",
    );
  }

  return context;
};
