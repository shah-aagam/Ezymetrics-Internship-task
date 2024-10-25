import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Sidebar from "./Sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Reports = ({ isSidebarOpen, toggleSidebar }) => {
  const [timeframe, setTimeframe] = useState("weekly"); 

  const chartData = {
    daily: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
      datasets: [
        {
          label: "Conversion Rates",
          data: [45, 30, 60, 55, 70],
          fill: false,
          borderColor: "rgba(28, 107, 160, 1)",
          tension: 0.1,
        },
      ],
    },
    weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Conversion Rates",
          data: [65, 59, 80, 81],
          fill: false,
          borderColor: "rgba(28, 107, 160, 1)",
          tension: 0.1,
        },
      ],
    },
    monthly: {
      labels: [
        "January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December",
      ],
      datasets: [
        {
          label: "Conversion Rates",
          data: [45, 60, 75, 90, 70, 85, 95, 80, 60, 70, 75, 90],
          fill: false,
          borderColor: "rgba(28, 107, 160, 1)",
          tension: 0.1,
        },
      ],
    },
  };

  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Leads Overview",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(28, 107, 160, 0.6)",
      },
    ],
  };

  const handleDownloadDummyData = () => {
    const dummyData = [
      ["Month", "Conversion Rate"],
      ["January", "45"],
      ["February", "60"],
      ["March", "75"],
      ["April", "90"],
      ["May", "70"],
      ["June", "85"],
      ["July", "95"],
      ["August", "80"],
      ["September", "60"],
      ["October", "70"],
      ["November", "75"],
      ["December", "90"],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      dummyData.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dummy_data.csv");
    document.body.appendChild(link); 

    link.click(); 
    document.body.removeChild(link); 
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("charts"); 
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("charts.pdf");
    });
  };

  return (
    <div className="flex flex-col md:flex-row">

      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      
      <div className='flex-1 p-4 md:p-8 bg-gray-50 transition-all duration-300 lg:ml-60'>

        <div className="flex justify-between items-center mb-8 ">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mb-4 p-2 pt-6"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
          <h1 className="text-3xl font-bold text-gray-800 pr-4">Re<span className="text-[#1C6BA0]">ports</span></h1>
        </div>


        <div className="mb-4">
          <label htmlFor="timeframe" className="text-gray-700 font-semibold">Select Timeframe for conversion rates:</label>
          <select
            id="timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="ml-2 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 bg-[#1C6BA0] text-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Visualizations */}
        <div className="mb-8" id="charts">
          <h2 className="text-xl font-semibold text-gray-700 mb-2 mt-5">Visualizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bar Chart */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, 
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
                height={200}
              />
            </div>

            {/* Line Chart based on selected timeframe */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <Line
                data={chartData[timeframe]}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, 
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
                height={200} 
              />
            </div>
          </div>
        </div>

        {/* Report Export Buttons */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Export Reports</h2>
          <div className="flex flex-col lg:flex-row gap-4">
            <button
              onClick={handleDownloadDummyData}
              className="bg-[#1C6BA0] text-white p-2 lg:w-60 rounded hover:bg-[#164e72]"
            >
              Download Report (CSV)
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-[#1C6BA0] text-white p-2 lg:w-60 rounded hover:bg-[#164e72]"
            >
              Download Report (PDF)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reports;
