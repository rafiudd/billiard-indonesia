"use client";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement
);

const BarChart = ({ data }) => {
  let randomBackgroundColor = [];
  let usedColors = new Set();

  let dynamicColors = function() {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      let color = "rgb(" + r + "," + g + "," + b + ")";

      if (!usedColors.has(color)) {
          usedColors.add(color);
          return color;
      } else {
          return dynamicColors();
      }
  };

  for (let i in data) {
      randomBackgroundColor.push(dynamicColors());
  }

  return (
    <div class="w-full">
      <Bar
        data={{
          labels: data.map((item) => moment(item.grouped_date).format('YYYY-MM-DD')),
          datasets: [
            {
              data: data.map((item) => item.totalbayar),
              backgroundColor: randomBackgroundColor,
            },
          ],
        }}
      />
    </div>
  );
};
export default BarChart;

