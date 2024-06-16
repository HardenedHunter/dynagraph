import { useEffect, useRef } from "react";
import { useStoreMap, useUnit } from "effector-react";

import { model } from "./model";
import { isNotStarted } from "./lib";

export const useDatasource = (id: string) => {
  const effectWasTriggered = useRef(false);

  const datasource = useStoreMap(model.$datasources, (store) => {
    const datasource = store[id];

    if (!datasource) {
      throw new Error("[FATAL] Datasource not found");
    }

    return datasource;
  });

  const getDataForDatasource = useUnit(model.getDataForDatasource);

  useEffect(() => {
    if (effectWasTriggered.current) return;
    effectWasTriggered.current = true;

    if (isNotStarted(datasource)) {
      setTimeout(() => getDataForDatasource(id), 500);
    }
  }, [datasource, getDataForDatasource, id]);

  return datasource;
};
