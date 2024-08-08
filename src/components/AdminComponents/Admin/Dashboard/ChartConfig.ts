import { ApexOptions } from "apexcharts";

export const inventLevel = {
  A: "50 ~ 250",
  B: "500 ~ 2500",
  C: "3000 ~ 15000",
  D: "20000 ~ 50000",
  E: "75000 ~ 500000",
};

/* Apex Chart */

export const RadarOption: ApexOptions = {
  colors: ["#007aff"],
  chart: {
    type: "radar",
    toolbar: {
      show: false,
    },
  },
  markers: {
    size: 7, // Increase this value for larger dots
  },
  xaxis: {
    categories: ["Approved", "Rejected", "Pending"],
  },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      // Custom HTML for the tooltip
      return `<div style="background: #007AFF; padding: 2px 10px; border-radius: 50px; width: 100px; text-align: center;">
        <p style="color: white">${series[seriesIndex][
          dataPointIndex
        ].toLocaleString()}</p>
      </div>`;
    },
  },
  responsive: [
    {
      breakpoint: 1920,
      options: {
        chart: {
          width: "100%",
        },
      },
    },
    {
      breakpoint: 990,
      options: {
        chart: {
          width: "300px",
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

export const BarOption: ApexOptions = {
  colors: ["#007aff"],
  chart: {
    type: "radar",
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      // Custom HTML for the tooltip
      return `<div style="background: #007AFF; padding: 2px 10px; border-radius: 50px; width: 100px; text-align: center;">
        <p style="color: white">${series[seriesIndex][dataPointIndex].toLocaleString()}</p>
      </div>`;
    }
  },
  xaxis: {
    categories: [
      "Total Registered Users",
      "Active Users",
      "Inactive Users",
      "Total Referrals",
    ],
    labels: {
      style: {
        colors: "var(--color-text)",
      },
    },
  },
  responsive: [
    {
      breakpoint: 1920,
      options: {
        chart: {
          width: "100%",
        },
      },
    },
    {
      breakpoint: 990,
      options: {
        chart: {
          width: "80%",
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

export const PieOption: ApexOptions = {
  chart: {
    type: "pie",
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      // Custom HTML for the tooltip
      return `<div style="background: #007AFF; padding: 2px 10px; border-radius: 50px; width: 100px; text-align: center;">
        <p style="color: white">${series[seriesIndex][dataPointIndex].toLocaleString()}</p>
      </div>`;
    }
  },
  legend: {
    labels: {
      colors: ["var(--color-text)", "var(--color-text)"],
    },
  },
  labels: ["Pending", "Resolved"],
  responsive: [
    {
      breakpoint: 1920,
      options: {
        chart: {
          width: "80%",
        },
        legend: {
          position: "bottom",
        },
      },
    },
    {
      breakpoint: 990,
      options: {
        chart: {
          width: "200px",
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
