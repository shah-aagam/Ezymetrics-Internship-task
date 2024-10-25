import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf"; 

const Analytics = ({ isSidebarOpen, toggleSidebar }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const conversionRateData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: [3.5, 4.2, 5.0, 6.1],
        fill: false,
        borderColor: "#1C6BA0",
        tension: 0.1,
      },
    ],
  };


  const trafficSourcesData = {
    labels: ["Social Media", "Referral", "Google Ads", "Direct"],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: ["#1C6BA0", "#7692FF", "#6ab2f9", "#FFA500"],
      },
    ],
  };

  const generateCSVReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Week,Conversion Rate (%)\n" +
      "Week 1,3.5\n" +
      "Week 2,4.2\n" +
      "Week 3,5.0\n" +
      "Week 4,6.1\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "conversion_report.csv");
    document.body.appendChild(link); 
    link.click();
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Conversion Rate Report", 14, 22);

    doc.setFontSize(12);
    doc.text("Week 1: 3.5%", 14, 40);
    doc.text("Week 2: 4.2%", 14, 50);
    doc.text("Week 3: 5.0%", 14, 60);
    doc.text("Week 4: 6.1%", 14, 70);

    doc.save("conversion_report.pdf");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 p-4 bg-gray-50 transition-all ${isSidebarOpen ? "ml-60" : "ml-0"} md:ml-60`}>
        
        <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mb-4 p-4"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
          <h1 className="text-3xl font-bold text-gray-800 pr-4">Anal<span className="text-[#1C6AB0]">ytics</span></h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Conversion Rate Over Time */}
          <div onClick={openModal} className="cursor-pointer">
            <h2 className="text-xl font-semibold text-gray-700 my-4">
              Conversion Rate Over Time
            </h2>
            <div className="h-64 bg-white shadow-lg p-4 rounded-lg">
              <Line
                data={conversionRateData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>
          </div>

          {/* Traffic Sources Analysis */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 my-4">
              Traffic Sources
            </h2>
            <div className="h-64 bg-white shadow-lg p-4 rounded-lg">
              <Pie
                data={trafficSourcesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>

        {/* Custom Report Generation */}
        <div className="mb-8 bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Generate Custom Reports
          </h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            <div>
              <label className="block text-gray-700">Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="p-2 border border-gray-300 rounded"
                dateFormat="MM/dd/yyyy"
                placeholderText="Select start date"
              />
            </div>
            <div>
              <label className="block text-gray-700">End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="p-2 border border-gray-300 rounded"
                dateFormat="MM/dd/yyyy"
                placeholderText="Select end date"
              />
            </div>
            <button
              onClick={generateCSVReport}
              className="bg-[#1C6BA0] text-white p-2 rounded"
            >
              Download CSV
            </button>
            <button
              onClick={generatePDFReport}
              className="bg-[#1C6BA0] text-white p-2 rounded"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Modal for Full View of Conversion Rate Chart */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Conversion Rate Over Time (Full View)
            </h2>
            <div className="h-96">
              <Line
                data={conversionRateData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Analytics;
