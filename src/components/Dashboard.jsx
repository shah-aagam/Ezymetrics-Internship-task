import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import Sidebar from "./Sidebar";
import Modal from "react-modal";
import close from "../assets/close-button.png";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from "chart.js/auto";

Chart.register(ChartDataLabels);

const Dashboard = ({isSidebarOpen , toggleSidebar}) => {
  const [currentDate, setCurrentDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLineChartModalOpen, setIsLineChartModalOpen] = useState(false);

  const [widgets, setWidgets] = useState({
    leadsOverview: true,
    conversionRate: true,
    activeCampaigns: true,
    weeklyLeadsChart: true,
    recentActivity: true,
    lineChart: true,
  });

  const [chartData, setChartData] = useState({
    labels: [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    data: [65, 59, 80, 81, 56, 55, 40],
  });

  const recentActivities = [
    {
      id: 1, title: "New Lead: John Doe", date: "10/21/2024", change: "+1 Lead", changeType: "add",
    },
    {
      id: 2, title: "Lead Converted: Jane Smith", date: "10/20/2024", change: "Converted", changeType: "convert",
    },
    {
      id: 3, title: "Campaign Started: Winter Sale", date: "10/19/2024", change: "Active", changeType: "active",
    },
  ];

  useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    setCurrentDate(dateString);
  }, []);

  const toggleWidget = (widget) => {
    setWidgets((prev) => ({
      ...prev, [widget]: !prev[widget],
    }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openLineChartModal = () => setIsLineChartModalOpen(true);
  const closeLineChartModal = () => setIsLineChartModalOpen(false);

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <button
          onClick={toggleSidebar}
          className="lg:hidden p-4 bg-gray-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      <div className="flex-1 md:pt-8 md:p-8 bg-gray-50 md:ml-60">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Dash<span className="text-[#1C6BA0]">board</span>
            </h1>
            <p className="text-sm text-gray-600">Here is an overview of your activities and insights.</p>
          </div>
          <div className="text-sm text-gray-500 mt-2 md:mt-0">{currentDate}</div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg md:text-xl p-4 font-semibold text-gray-700 mb-2">Customize Dashboard</h2>
          <div className="flex flex-wrap space-x-2 mb-4 px-4">
            {Object.keys(widgets).map((widget, index) => (
              <button
                key={index}
                onClick={() => toggleWidget(widget)}
                className="bg-[#1C6BA0] text-white text-xs md:text-sm px-2 py-1 rounded mb-2"
              >
                {widgets[widget] ? `Hide ${widget}` : `Show ${widget}`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {widgets.leadsOverview && (
            <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Leads Overview</h2>
              <p className="text-2xl font-bold text-gray-800">142 New Leads</p>
              <p className="text-sm text-gray-500">Over the past week</p>
            </div>
          )}

          {widgets.conversionRate && (
            <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Conversion Rate</h2>
              <p className="text-2xl font-bold text-gray-800">12.4%</p>
              <p className="text-sm text-gray-500">Compared to last month</p>
            </div>
          )}

          {widgets.activeCampaigns && (
            <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Active Campaigns</h2>
              <p className="text-2xl font-bold text-gray-800">5 Active</p>
              <p className="text-sm text-gray-500">Running this month</p>
            </div>
          )}
        </div>

        {/* Chart Section (Bar + Pie) */}
        {widgets.weeklyLeadsChart && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white shadow-lg rounded-lg p-6 h-80">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Weekly Leads (Preview)
              </h2>
              <div className="h-64 cursor-pointer" onClick={openModal}>
                <Bar
                  data={{
                    labels: chartData.labels,
                    datasets: [
                      {
                        label: "Weekly Leads",
                        backgroundColor: "#1C6BA0",
                        borderColor: "#1C6BA0",
                        borderWidth: 1,
                        hoverBackgroundColor: "#2A8FC1",
                        hoverBorderColor: "#1C6BA0",
                        data: chartData.data,
                      },
                    ],
                  }}
                  options={barChartOptions}
                />
              </div>
            </div>

            {/* Pie Chart */}
            
            <div className="bg-white shadow-lg rounded-lg p-6 h-80">
              <h2 className="inline-flex text-xl font-semibold text-gray-700">
                Lead Sources
              </h2>
              <div className="flex ">
                <div className="w-1/3 lg:pr-6 flex flex-col justify-center relative">
                  <ul className="text-left space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="inline-block w-4 h-4 mr-2 bg-[#7692FF]"></span>
                      Facebook
                    </li>
                    <li className="flex items-center">
                      <span className="inline-block w-4 h-4 mr-2 bg-[#6ab2f9]"></span>
                      Google Ads
                    </li>
                    <li className="flex items-center">
                      <span className="inline-block w-4 h-4 mr-2 bg-[#3D518C]"></span>
                      Email Campaigns
                    </li>
                    <li className="flex items-center">
                      <span className="inline-block w-4 h-4 mr-2 bg-[#091540]"></span>
                      Organic
                    </li>
                  </ul>
                </div>
                <div className="h-60 absolute -right-5">
                  <Pie
                    data={{
                      labels: [
                        "Facebook",
                        "Google Ads",
                        "Email Campaigns",
                        "Organic",
                      ],
                      datasets: [
                        {
                          data: [300, 50, 100, 80],
                          backgroundColor: [
                            "#7692FF",
                            "#6ab2f9",
                            "#3D518C",
                            "#091540",
                          ],
                          hoverBackgroundColor: [
                            "#7692FF",
                            "#6ab2f9",
                            "#3D518C",
                            "#091540",
                          ],
                        },
                      ],
                      hoverOffset: 4,
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      animation: {
                        animateRotate: true,
                        animateScale: true,
                      },
                      plugins: {
                        datalabels: {
                          color: '#fff', // Label color
                          formatter: (value, context) => {
                            const total = context.chart.data.datasets[0].data.reduce(
                              (a, b) => a + b,
                              0
                            );
                            const percentage = ((value / total) * 100).toFixed(2) + '%';
                            return percentage;
                          },
                        },
                        legend: {
                          display: false, 
                        },
                      },
                      layout: {
                        padding: {
                          left: 10,
                          right: 10,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}


        {widgets.lineChart && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6 h-80">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Leads Over Time</h2>
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                  {
                    label: "Leads",
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: "#36A2EB",
                    fill: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        )}

        {widgets.recentActivity && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded">
                <p>{activity.title}</p>
                <span className={`text-sm font-bold ${activity.changeType === "add" ? "text-green-500" : "text-blue-500"}`}>{activity.change}</span>
              </div>
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="bg-white p-6 max-w-lg mx-auto my-20 rounded shadow-lg outline-none"
        >
          <img src={close} alt="close" className="w-6 cursor-pointer mb-4 ml-auto" onClick={closeModal} />
          <div className="h-64">
            <Bar
              data={{
                labels: chartData.labels,
                datasets: [{
                  label: "Weekly Leads",
                  backgroundColor: "#1C6BA0",
                  borderColor: "#1C6BA0",
                  data: chartData.data,
                }],
              }}
              options={barChartOptions}
            />
          </div>
        </Modal>

        <Modal
          isOpen={isLineChartModalOpen}
          onRequestClose={closeLineChartModal}
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        >
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Leads Over the Year (Full View)
            </h2>
            <div className="h-96">
              <Line
                data={{
                  labels: [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ],
                  datasets: [
                    {
                      label: "Leads",
                      data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 75, 50, 90], 
                      fill: false,
                      borderColor: "#36A2EB",
                      tension: 0.1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Months",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Number of Leads",
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
            <button
              onClick={closeLineChartModal}
              className="absolute top-2 right-2 px-2 hover:border hover:border-black hover:rounded-md transition-all duration-300"
            >
              <img src={close} width={24} />
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
