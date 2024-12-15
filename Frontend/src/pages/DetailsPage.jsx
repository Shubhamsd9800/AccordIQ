import React, { useState, useMemo } from 'react';
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEllipsis,
  faCloudArrowDown,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import SignStatus from '../components/SignStatus';

const CONTRACT_STATUSES = [
  "Review",
  "Sent for Signature",
  "Internal Signature",
  "Executed"
];

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { contracts, loading, error } = useSelector((state) => state.contracts || {});

  const contract = useMemo(() => {
    return contracts?.find((c) => c.id === parseInt(id || '0'));
  }, [contracts, id]);

  const [localContract, setLocalContract] = useState(contract || null);
  const [isSign, setIsSign] = useState(false);

  const buttonColor = useMemo(() => {
    if (localContract?.status === "Internal Signature") return "bg-blue-500";
    return "bg-teal-500";
  }, [localContract?.status]);

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Error: {error}</p>;
  if (!localContract) return <p className="text-center p-4">Contract not found</p>;

  const handleSignStatusUpdate = () => {
    if (!localContract) return;

    const currentIndex = CONTRACT_STATUSES.indexOf(localContract.status);
    if (currentIndex < CONTRACT_STATUSES.length - 1) {
      const nextStatus = CONTRACT_STATUSES[currentIndex + 1];
      setLocalContract({ ...localContract, status: nextStatus });
      setIsSign(true);
    }
  };

  const renderStatusProgress = () => {
    return CONTRACT_STATUSES.map((status, index) => (
      <div key={index} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-1  mb-2 sm:mb-0">
        <div
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center w-full sm:w-auto
            ${localContract.status === status
              ? 'bg-teal-600 text-white'
              : 'bg-gray-200 text-gray-500'
            }`}
        >
          {localContract.status === status ? (
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2">
              <FontAwesomeIcon icon={faCheck} className="text-teal-600" />
            </span>
          ) : (
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2"></span>
          )}
          {status}
        </div>
        {index < CONTRACT_STATUSES.length - 1 && (
          <div className="hidden sm:block relative w-8 h-[2px] bg-teal-600">
            <span className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-teal-600"></span>
            <span className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-600"></span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg border border-gray-300 w-full max-w-5xl mx-auto min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/')}
            className="text-gray-700 hover:text-gray-900"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {localContract.name}
          </h2>
        </div>

        <button className="text-gray-700 hover:text-gray-900">
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>

      <div className="flex-grow">
        {/* Contract Status Section */}
        <div className="p-4 sm:p-6 md:flex md:justify-between">
          <p className="text-xl text-gray-500 mb-4 font-medium">
            Contract Status
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            {renderStatusProgress()}
          </div>
        </div>

        {isSign && <SignStatus />}

        {/* Content Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-lg border border-gray-300 mx-4 sm:mx-6 min-h-[100px] mb-4">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-xl font-medium text-gray-800 mb-1">
              {localContract.name} - Version xx
            </h3>
            <p className="text-sm text-gray-600">
              Last Updated on {localContract.lastUploaded}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
              Edit Document
            </button>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
              Preview
            </button>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
              <FontAwesomeIcon icon={faCloudArrowDown} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 border-t border-gray-200 mt-auto space-y-4 sm:space-y-0">
        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={handleSignStatusUpdate}
          className={`w-full sm:w-auto px-8 py-2 ${buttonColor} text-white rounded-full hover:opacity-90`}
        >
          {localContract.status === "Review"
            ? "Send for Signature"
            : localContract.status === "Sent for Signature"
            ? "Send for Internal Signature"
            : localContract.status === "Internal Signature"
            ? "Execute Contract"
            : "Completed"}
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;

