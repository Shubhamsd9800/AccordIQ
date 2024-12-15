import React, { useEffect, useCallback } from "react";
import ContractButton from "./ContractButton";
import Down from "../images/doward.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchContracts } from "../App/Feature/contractsSlice";
import { useNavigate } from "react-router-dom";

const ContractTable = () => {
  const dispatch = useDispatch();
  const { contracts = [], loading, error } = useSelector((state) => state.contracts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !contracts.length) {
      dispatch(fetchContracts());
    }
  }, [dispatch, loading, contracts.length]);

  const handleRowClick = useCallback((contractId) => {
    navigate(`/details/${contractId}`);
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="md:ml-10 px-4 sm:px-8 py-8 rounded-3xl bg-white shadow-xl border-gray-200 space-y-7">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        {/* Contract Buttons */}
       <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-start gap-2 sm:gap-4">
          <ContractButton
            label="Name"
            isActiveDefault={true}
            count={contracts.length}
            size="small"
          />
          <ContractButton
            label="Participating"
            isActiveDefault={false}
            count={14}
            size="small"
          />
          <ContractButton
            label="All Contracts"
            isActiveDefault={false}
            count={50}
            size="small"
          />
          <ContractButton
            label="Completed"
            isActiveDefault={false}
            count={14}
            size="small"
          />
        </div>
  
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          {/* Filter Button */}
          <button className="px-2 py-1 sm:px-4 sm:py-2 w-full sm:w-auto bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 text-sm sm:text-base">
            Filter
          </button>
  
          {/* View Button */}
          <div className="flex items-center px-2 py-1 sm:px-4 sm:py-2 w-full sm:w-auto bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 text-sm sm:text-base">
            <h6 className="mr-2">View</h6>
            <img src={Down} alt="Dropdown Icon" className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
  
      {/* Table Section */}
      <div className="overflow-x-auto justify-center -mx-2 sm:-mx-4">
        <div className="min-w-full border-collapse border-b-2 border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left text-[0.8rem] sm:text-[1rem] font-medium text-gray-600 border-b border-gray-200">
                  NAME
                </th>
                <th className="px-4 py-2 text-left text-[0.8rem] sm:text-[1rem] font-medium text-gray-600 border-b border-gray-200">
                  STATUS
                </th>
                <th className="px-4 py-2 text-left text-[0.8rem] sm:text-[1rem] font-medium text-gray-600 border-b border-gray-200">
                  ASSIGNED
                </th>
                <th className="px-4 py-2 text-left text-[0.8rem] sm:text-[1rem] font-medium text-gray-600 border-b border-gray-200">
                  UPLOADED
                </th>
                <th className="px-4 py-2 text-left text-[0.8rem] sm:text-[1rem] font-medium text-gray-600 border-b border-gray-200">
                  ACTIVITY
                </th>
                <th className="px-4 py-2 text-left text-[0.8rem] sm:text-[1rem] font-medium text-gray-600 border-b border-gray-200">
                  LAST UPDATED
                </th>
              </tr>
            </thead>
          </table>
          <div className="max-h-[300px] overflow-y-auto">
            <table className="min-w-full table-auto">
              <tbody>
                {contracts.map((contract) => (
                  <tr
                    key={contract.id}
                    onClick={() => handleRowClick(contract.id)}
                    className="hover:bg-blue-200 cursor-pointer"
                  >
                    <td className="px-4 py-2 text-blue-500 border-b border-gray-200">
                      {contract.name || "N/A"}
                    </td>
                    {/* Status Column */}
                    <td className="px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            contract.status === "Review" ? "bg-blue-500" : "bg-green-500"
                          }`}
                        ></span>
                        <span className="ml-2">{contract.status || "N/A"}</span>
                      </div>
                    </td>
                    {/* Assigned Column */}
                    <td className="px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        {Array.isArray(contract.assigned) && contract.assigned.length
                          ? contract.assigned.map((initial, i) => (
                              <div
                                key={i}
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  i === 0 ? "bg-teal-500" : "bg-yellow-500"
                                } text-white`}
                              >
                                {initial || "N/A"}
                              </div>
                            ))
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                      {contract.uploaded || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                      {contract.activity || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
                      {contract.lastUploaded || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractTable;

