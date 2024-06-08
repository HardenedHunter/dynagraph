import { useStoreMap, useUnit } from "effector-react";

import { model } from "./model";
import { useEffect, useRef } from "react";

export const useDatasource = (id: string | null) => {
  const effectWasTriggered = useRef(false);

  const datasource = useStoreMap(model.$datasources, (state) =>
    id ? state[id] : undefined,
  );

  const getDataForDatasource = useUnit(model.getDataForDatasource);

  useEffect(() => {
    if (!id) return;

    if (effectWasTriggered.current) return;
    effectWasTriggered.current = true;

    setTimeout(() => getDataForDatasource(id), 500);
  }, [getDataForDatasource, id]);

  if (!datasource) {
    return null;
  }

  return datasource;
};
