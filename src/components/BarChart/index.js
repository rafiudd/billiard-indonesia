"use client";
import moment from "moment-timezone";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement,
  Legend
);

const BarChart = ({ data, pesanan }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  return (
    <div className="w-full">
      <Bar
        data={{
          labels: data.map((item) => moment(item.grouped_date).tz('Asia/Jakarta').format('YYYY-MM-DD')),
          datasets: [
            {
              label: 'Billiard',
              data: data.map((item) => item.totalbayar),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Cafe',
              data: pesanan.map((item) => item.totalbayar),
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default BarChart;
