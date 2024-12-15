import React, { useState } from 'react';
import CheckList from "../images/checklist.png";

const ContractButton = ({ label, isActiveDefault, count }) => {
  const [isActive, setIsActive] = useState(isActiveDefault);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center  px-4 py-2 rounded-full ${
        isActive
          ? 'bg-blue-600 text-white border border-blue-600'
          : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
      }`}
    >
      <span className="flex items-center gap-2">
        <img src={CheckList} alt="Checklist" />
        {label}
      </span>
      <span
        className={`text-sm rounded-full w-6 h-6 flex items-center justify-center ${
          isActive
            ? 'bg-white text-blue-800'
            : 'bg-gray-200 text-black'
        }`}
      >
        {count}
      </span>
    </button>
  );
};

export default ContractButton;
