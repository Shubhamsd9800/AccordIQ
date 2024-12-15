import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock, faEllipsis} from '@fortawesome/free-solid-svg-icons';

const SignStatus = () => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className='flex justify-between'>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Sign Status</h3>
      <h4 className=' italic font-light'>1 out of 2 signature collected</h4>
      </div>
      
      <div className=" border-b-2 border-gray-300 rounded-lg">
        <div className="flex justify-between items-center p-2 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">Counterparty</span>
          <span className="text-sm text-gray-500">John</span>
          <span className="text-sm text-gray-500">Pending</span>
          <FontAwesomeIcon icon={faClock} />
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
        <div className="flex justify-between items-center p-2">
          <span className="text-sm font-medium text-gray-700">Internal</span>
          <span className="text-sm text-gray-500">Jack Shane</span>
          <span className="text-sm text-gray-500">Pending</span>
          <FontAwesomeIcon icon={faClock} />
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
    </div>
  );
};

export default SignStatus;
