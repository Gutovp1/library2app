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
        labels: ["Available books", "Rented books"],
        datasets: [
          {
            backgroundColor: ["green", "red"],
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
