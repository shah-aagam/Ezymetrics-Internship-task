import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Leads = ({isSidebarOpen , toggleSidebar}) => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [isLeadDetailModalOpen, setIsLeadDetailModalOpen] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [followUpDate, setFollowUpDate] = useState(null);

  const leadsData = [
    { id: 1, name: "John Doe", status: "New", source: "Social Media", assignedTo: "Team A" },
    { id: 2, name: "Jane Smith", status: "Contacted", source: "Referral", assignedTo: "Team B" },
    { id: 3, name: "Chris Johnson", status: "Converted", source: "Google Ads", assignedTo: "Team A" },
  ];

  const teamMembers = ["Team A", "Team B", "Team C"];

  const leadSources = {
    labels: ["Social Media", "Referral", "Google Ads"],
    datasets: [
      {
        label: "Leads by Source",
        data: [10, 5, 7],
        backgroundColor: ["#1C6BA0", "#6ab2f9", "#7692FF"],
      },
    ],
  };

  const openLeadDetailModal = (lead) => {
    setSelectedLead(lead);
    setIsLeadDetailModalOpen(true);
    setAssignedTo(lead.assignedTo);
    setFollowUpDate(null);
  };

  const closeLeadDetailModal = () => {
    setIsLeadDetailModalOpen(false);
    setSelectedLead(null);
  };

  const handleAssignLead = (event) => {
    setAssignedTo(event.target.value);
  };

  const handleFollowUpDateChange = (date) => {
    setFollowUpDate(date);
  };

  const saveLeadDetails = () => {
    console.log("Lead assigned to:", assignedTo);
    console.log("Follow-up date set to:", followUpDate);
    closeLeadDetailModal();
  };

  return (
    <div className="flex">

      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 p-4 lg:p-8 bg-gray-50 overflow-x-hidden lg:ml-60">        

        {/* Lead Management Header */}
        <div className="flex justify-between items-center mb-8">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mb-4 p-2 pt-6"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
          <h1 className="text-3xl font-bold text-gray-800 ">Leads <span className="text-[#1C6BA0]">Management</span></h1>
        </div>

        {/* Lead List with Filters */}
        <div className="mb-8 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-700 lg:mb-4">All Leads</h2>
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left">
                <th className="p-4">Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Source</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {leadsData.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-100 transition-all duration-200">
                  <td className="p-4">{lead.name}</td>
                  <td className="p-4">{lead.status}</td>
                  <td className="p-4">{lead.source}</td>
                  <td className="p-4">{lead.assignedTo}</td>
                  <td className="p-4">
                    <button
                      onClick={() => openLeadDetailModal(lead)}
                      className="bg-[#1C6BA0] text-white px-4 py-2 rounded"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lead Source Analysis Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700">Lead Source Analysis</h2>
          <Bar data={leadSources} />
        </div>

        {/* Lead Detail Modal */}
        <Modal
          isOpen={isLeadDetailModalOpen}
          onRequestClose={closeLeadDetailModal}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          overlayClassName="fixed inset-0"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Lead Details</h2>
            {selectedLead && (
              <>
                <p><strong>Name:</strong> {selectedLead.name}</p>
                <p><strong>Status:</strong> {selectedLead.status}</p>
                <p><strong>Source:</strong> {selectedLead.source}</p>

                <div className="mt-4">
                  <label className="block mb-1" htmlFor="assignedTo">Assign to:</label>
                  <select
                    id="assignedTo"
                    value={assignedTo}
                    onChange={handleAssignLead}
                    className="block w-full p-2 border rounded"
                  >
                    <option value="">Select...</option>
                    {teamMembers.map((member, index) => (
                      <option key={index} value={member}>{member}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block mb-1" htmlFor="followUpDate">Follow-up Date:</label>
                  <DatePicker
                    selected={followUpDate}
                    onChange={handleFollowUpDateChange}
                    className="block w-full p-2 border rounded"
                    placeholderText="Select a date"
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={saveLeadDetails}
                    className="bg-[#1C6BA0] text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={closeLeadDetailModal}
                    className="ml-2 px-4 py-2 rounded border border-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Leads;
