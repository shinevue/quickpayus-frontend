import { ApexOptions } from "apexcharts";
import { useEffect, useState, useCallback } from "react";

import { useFetchBalanceAnalticsForChartQuery } from "@/app/slice";
import { produce } from "immer";
interface ChartSeries {
  name: string;
  data: number[];
  color: string;
}

/*
 **  value type of chart's  configuration
 */
export interface ChartConfig {
  series: ChartSeries[];
  options: ApexOptions;
}

const initialChartConfig: ChartConfig = {
  series: [
    {
      name: "Sales",
      data: Array.from({ length: 31 }, () => 0),
      color: "#7e7e7e",
    },
  ],

  options: {
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        gradientToColors: ["var(--color-text)"],
        stops: [10, 100],
      },
    },
    chart: {
      type: "bar",
      width: "90%",
      height: "auto",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "23.5%",
        borderRadius: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [],
      labels: {
        show: true,
        style: {
          colors: "var(--color-text)",
        },
      },
    },
    yaxis: {
      forceNiceScale: true,
      labels: {
        show: false,
        align: "right",
        style: {
          colors: "var(--color-text)",
        },
        formatter: function (val, index) {
          return val.toFixed(0);
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val.toFixed(2) + " thousands";
        },
      },
      marker: {
        show: false,
      },
    },
  },
};

export const defaultXValue = {
  month: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  week: ["1st", "2nd", "3rd", "4th", "5th"],
  day: Array.from({ length: 31 }, (_, i) => i + 1),
};

export function largestPowerOfTen(s) {
  return Math.pow(10, 1 + Math.floor(Math.log10(s)));
}
/*
 ** interface of user dashboard
 */

export const generateChartItemWidth = (length: number): number => {
  let width = (window.innerWidth - 348) / length - 70;
  if (width > 150) return 100;
  else if (width < 25) return 25;
  return width;
};

export function useChartData() {
  const [loading, setLoading] = useState<boolean>(false);
  const [balanceFrame, setBalanceFrame] = useState<string>("profits");
  const [timeFrame, setTimeFrame] = useState<string>("day");
  const [chart, setChart] = useState<ChartConfig>(initialChartConfig);

  const fetchResult = useFetchBalanceAnalticsForChartQuery({
    balanceFrame,
    timeFrame,
  });

  const handleBalanceChange = useCallback((value: any): void => {
    setBalanceFrame(value);
    setLoading(true);
  }, []);

  const handleTimeChange = useCallback((value: any): void => {
    setTimeFrame(value);
    setLoading(true);
  }, []);

  // useEffect(() => {
  //   if (fetchResult.isSuccess) {
  //     setChart(
  //       produce((draft) => {
  //         //fix the chart data in here
  //         draft.series[0].data = Array.from(
  //           { length: fetchResult.data.length },
  //           () => Math.floor(Math.random() * 5)
  //         );
  //         if (draft.options.xaxis) {
  //           draft.options.xaxis.categories = defaultXValue[timeFrame];
  //         }
  //         if (draft.options.plotOptions?.bar) {
  //           draft.options.plotOptions.bar.columnWidth = generateChartItemWidth(
  //             defaultXValue[timeFrame].length
  //           );
  //         }
  //         if (draft.options.yaxis) {
  //           // if (draft.options.yaxis?.labels) {
  //           draft.options.yaxis.max = largestPowerOfTen(
  //             Math.max(...(fetchResult.data + 200))
  //           );
  //         }
  //       })
  //     );
  //     setLoading(false);
  //   }
  // }, [fetchResult]);

  // useEffect(() => {
  //   fetchResult.refetch();
  // }, [balanceFrame, timeFrame]);
  return {
    chart,
    loading,
    balanceFrame,
    timeFrame,
    handleBalanceChange,
    handleTimeChange,
  };
}

let currentDate = new Date();
let monthNumber = currentDate.getMonth();
let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const daily = {
   options: {
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        gradientToColors: ["var(--color-text)"],
        stops: [10, 100],
      },
    },
    chart: {
      type: "bar",
      width: "90%",
      height: "auto",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: generateChartItemWidth(months[monthNumber]),
        borderRadius: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: Array.from({ length: months[monthNumber] }, (_, i) => i + 1),
      labels: {
        show: true,
        style: {
          colors: "var(--color-text)",
        },
      },
    },
    yaxis: {
      forceNiceScale: true,
      labels: {
        show: false,
        align: "right",
        style: {
          colors: "var(--color-text)",
        },
        formatter: function (val, index) {
          return val.toFixed(0);
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val.toFixed(2) + " thousands";
        },
      },
      marker: {
        show: false,
      },
    },
   }
};


export const monthly = {
  options: {
   fill: {
     type: "gradient",
     gradient: {
       type: "vertical",
       gradientToColors: ["var(--color-text)"],
       stops: [10, 100],
     },
   },
   chart: {
     type: "bar",
     width: "90%",
     height: "auto",
     toolbar: {
       show: false,
     },
     animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
  }
   },
   plotOptions: {
     bar: {
       horizontal: false,
       columnWidth: generateChartItemWidth(defaultXValue['month'].length),
       borderRadius: 10,
     },
   },
   dataLabels: {
     enabled: false,
   },
   stroke: {
     show: true,
     width: 1,
     colors: ["transparent"],
   },
   grid: {
     show: false,
     borderColor: "#ccc",
     strokeDashArray: 2,
   },
   xaxis: {
     categories: defaultXValue['month'],
     labels: {
       show: true,
       style: {
         colors: "var(--color-text)",
       },
     },
   },
   yaxis: {
     forceNiceScale: true,
     labels: {
       show: false,
       align: "right",
       style: {
         colors: "var(--color-text)",
       },
       formatter: function (val, index) {
         return val.toFixed(0);
       },
     },
   },

   tooltip: {
     y: {
       formatter: function (val) {
         return "$ " + val.toFixed(2) + " thousands";
       },
     },
     marker: {
       show: false,
     },
   },
  }
};


export const weekly = {
  options: {
   fill: {
     type: "gradient",
     gradient: {
       type: "vertical",
       gradientToColors: ["var(--color-text)"],
       stops: [10, 100],
     },
   },
   chart: {
     type: "bar",
     width: "90%",
     height: "auto",
     toolbar: {
       show: false,
     },
   },
   plotOptions: {
     bar: {
       horizontal: false,
       columnWidth: generateChartItemWidth(defaultXValue['week'].length),
       borderRadius: 10,
     },
   },
   dataLabels: {
     enabled: false,
   },
   stroke: {
     show: true,
     width: 1,
     colors: ["transparent"],
   },
   grid: {
     show: false,
     borderColor: "#ccc",
     strokeDashArray: 2,
   },
   xaxis: {
     categories: defaultXValue['week'],
     labels: {
       show: true,
       style: {
         colors: "var(--color-text)",
       },
     },
   },
   yaxis: {
     forceNiceScale: true,
     labels: {
       show: false,
       align: "right",
       style: {
         colors: "var(--color-text)",
       },
       formatter: function (val, index) {
         return val.toFixed(0);
       },
     },
   },

   tooltip: {
     y: {
       formatter: function (val) {
         return "$ " + val.toFixed(2) + " thousands";
       },
     },
     marker: {
       show: false,
     },
   },
  }
};