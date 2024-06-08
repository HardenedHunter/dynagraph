type PrometheusResponse = {
  status: "success";
  data: {
    resultType: "matrix";
    result: {
      metric: {
        __name__: string;
        id?: string;
      };
      values: [number, string][];
    }[];
  };
};

// В будущем это стоит разбить на части
export const transformPrometheusResponse = (response: PrometheusResponse) => {
  const { result } = response.data;

  const keySet = new Set<string>();

  const resultMap = new Map<
    number,
    { name: number; [key: string]: string | number }
  >();

  result.forEach((res) =>
    res.values.forEach((entry) => {
      const value = resultMap.get(entry[0]) ?? { name: entry[0] };
      const dataKey = res.metric.id ?? res.metric.__name__;

      keySet.add(dataKey);
      value[dataKey] = Number.parseFloat(entry[1]);
      resultMap.set(entry[0], value);
    }),
  );

  const data = [...resultMap.values()]
    .sort((a, b) => {
      if (a.name > b.name) return 1;

      // 0 быть не может, name уникален
      return -1;
    })
    .map((item) => {
      const date = new Date(item.name * 1000);
      const name = date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return { ...item, name };
    });

  const lines = [...keySet].map((dataKey) => ({ dataKey }));

  return { data, lines };
};
