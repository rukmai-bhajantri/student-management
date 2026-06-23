import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
function AttendanceChart() {
  const data = {
    labels: ["Java", "CSS", "React", "HTML"],
    datasets: [
      {
        label: "Attendance %",
        data: [80, 90, 70, 95],
        backgroundColor: ["red","blue","green","orange"]
      }
    ]
  };

  return (
    <div style={{width:"600px", margin:"auto"}}>
      <Bar data={data} />
    </div>
  );
}

export default AttendanceChart;
