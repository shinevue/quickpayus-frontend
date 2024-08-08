import { ApexOptions } from "apexcharts";
import { useSelector } from "react-redux";
import { selectSetting } from "@/app/selectors";

interface ChartSeries {
  name: string;
  data: number[];
}
export interface ChartConfig {
  series: ChartSeries[];
  options: ApexOptions;
}

export const eChartMonthly: ChartConfig = {
  options: {
    chart: {
      id: "basic-area-chart",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false // Disables zooming capability
      },
    },
    
    fill: {
      colors: ['#007AFF', '#D5E4F4'], // Customize the fill colors here
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        stops: [0, 300]
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#007AFF"],
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          colors: "var(--color-text)",
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: "var(--color-text)",
        },
      },
      min: 0
    },

    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        // Custom HTML for the tooltip
        return `<div style="background: #007AFF; padding: 2px 10px; border-radius: 50px; width: 100px; text-align: center;">
          <p style="color: white">$${series[seriesIndex][dataPointIndex].toLocaleString()}</p>
        </div>`;
      }
    },
  },
  series: [
    {
      name: "Series 1",
      data: Array.from({ length: 12 }, () => Math.floor((Math.random() + 0.5) * 100))
    }
  ]
};

let currentDate = new Date();
let monthNumber = currentDate.getMonth();
let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const eChartDaily: ChartConfig = {
  options: {
    chart: {
      id: "daily analyistic",
      toolbar: {
        show: false,
      },
    },
    
    fill: {
      colors: ['#007AFF', '#D5E4F4'], // Customize the fill colors here
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        stops: [0, 100]
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#007AFF"],
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: Array.from({ length: months[monthNumber] }, (item : unknown, index : number) => index + 1),
      labels: {
        show: true,
        style: {
          colors: "var(--color-text)",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: "var(--color-text)",
        },
      },
      min: 0
    },
    
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        // Custom HTML for the tooltip
        return `<div style="background: #007AFF; padding: 2px 10px; border-radius: 50px; width: 100px; text-align: center;">
          <p style="color: white">$${series[seriesIndex][dataPointIndex].toLocaleString()}</p>
        </div>`;
      }
    },
  },
  series: [
    {
      name: "Series 1",
      data: Array.from({ length: 30 }, () => Math.floor((Math.random() + 0.5) * 100))
    }
  ]
};

export const eChartWeekly: ChartConfig = {
  options: {
    chart: {
      id: "basic-area-chart",
      toolbar: {
        show: false,
      },
    },
    
    fill: {
      colors: ['#007AFF', '#D5E4F4'], // Customize the fill colors here
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        stops: [0, 300]
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#007AFF"],
    },
    grid: {
      show: false,
    },
    xaxis: {
      
      categories: Array.from({ length: 4 }, (item : unknown, index : number) => index + 1),
      labels: {
        show: true,
        style: {
          colors: "var(--color-text)",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: "var(--color-text)",
        },
      },
      min: 0
    },

    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        // Custom HTML for the tooltip
        return `<div style="background: #007AFF; padding: 2px 10px; border-radius: 50px; width: 100px; text-align: center;">
          <p style="color: white">$${series[seriesIndex][dataPointIndex].toLocaleString()}</p>
        </div>`;
      }
    },
  },
  series: [
    {
      name: "Series 1",
      data: Array.from({ length: 4 }, () => Math.floor((Math.random() + 0.5) * 100))
    }
  ]
};