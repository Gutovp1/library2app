<template>
  <Doughnut :chart-options="chartOptions" :chart-data="chartData" />
</template>

<script>
import { Doughnut } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "DoughnutBook",
  components: {
    Doughnut,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      chartData: {
        labels: ["Titles", "Available Titles", "Volumes"],
        datasets: [
          {
            backgroundColor: ["#FF7E55", "#49C9A8", "#35CFFF"],
            data: Object.values(this.data),
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16,
              },
            },
          },
        },
      },
    };
  },
};
</script>
